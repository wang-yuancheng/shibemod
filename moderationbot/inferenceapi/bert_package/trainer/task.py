"""
This file contains code used to fine-tune distilBERT base uncased on Vertex AI Workbench
"""

import os
import torch
import numpy as np
from datasets import load_dataset
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    TrainingArguments, Trainer
)
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import precision_recall_fscore_support
from torch.nn.functional import softmax
import hypertune   
import argparse
from pathlib import Path

# ------------------------------------------------------------------
# 1.  File paths
# ------------------------------------------------------------------
TRAIN_URI    = "gs://bucket-discord-bert/discord-train.csv"
TEST_URI     = "gs://bucket-discord-bert/discord-test.csv"
gcs_uri = os.environ["AIP_MODEL_DIR"]

if gcs_uri.startswith("gs://"):
    # strip off the "gs://" and prepend "/gcs/"
    fuse_path = "/gcs/" + gcs_uri[len("gs://"):]
else:
    # if it’s already a local path, just use it
    fuse_path = gcs_uri
    
# Now wrap as a Path
MODEL_DIR = Path(fuse_path)
# ------------------------------------------------------------------
# 2.  Load datasets
# ------------------------------------------------------------------
ds = load_dataset(
    "csv",
    data_files={"train": TRAIN_URI,
                "test": TEST_URI
               },
)
# ------------------------------------------------------------------
# 3. Hyperparameters
# ------------------------------------------------------------------
parser = argparse.ArgumentParser()
parser.add_argument("--lr", type=float, default=2e-5)
parser.add_argument("--weight_decay", type=float, default=0.01)
parser.add_argument("--epochs", type=int, default=3)
args_cli, _ = parser.parse_known_args()

# ------------------------------------------------------------------
# 4.  Tokenise
# ------------------------------------------------------------------
tok = AutoTokenizer.from_pretrained("distilbert-base-uncased")

def tokenize(batch):
    return tok(batch["msg_content"], truncation=True, padding="max_length")

for split in ds:
    ds[split] = ds[split].map(tokenize, batched=True)

# Keep only text-features and label
needed_cols = {"input_ids", "attention_mask", "label"}
for split in ds:
    cols_to_remove = set(ds[split].column_names) - needed_cols
    ds[split] = ds[split].remove_columns(list(cols_to_remove))

# ------------------------------------------------------------------
# 5.  Class weights
# ------------------------------------------------------------------
y_train = np.array(ds["train"]["label"])
classes=np.array([0,1])
weights = compute_class_weight("balanced", classes=classes, y=y_train)
class_weights = torch.tensor(weights, dtype=torch.float)

# ------------------------------------------------------------------
# 6.  Model
# ------------------------------------------------------------------
model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=2
)

# ------------------------------------------------------------------
# 7.  Custom loss using the weights
# ------------------------------------------------------------------
def weighted_loss(outputs, labels, **kwargs):
    # `outputs` is a ModelOutput; logits is a Tensor [batch_size, num_labels]
    logits = outputs.logits
    # move your precomputed class_weights to the same device
    loss_fct = torch.nn.CrossEntropyLoss(
        weight=class_weights.to(logits.device)
    )
    return loss_fct(logits, labels)

# ------------------------------------------------------------------
# 8.  Metrics (converts 
# ------------------------------------------------------------------
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    # preds = np.argmax(logits, axis=-1)
    probs = torch.nn.functional.softmax(torch.tensor(logits), dim=-1).numpy()
    threshold = 0.70  
    # For each row, get class 1 prob (probs[:, 1]), check if ≥ threshold (gives bool), then convert to int (True→1, False→0)
    preds = (probs[:, 1] >= threshold).astype(int) 
    
    p, r, f, _ = precision_recall_fscore_support(labels, preds, average="binary", zero_division=0)
    return {"precision": p, "recall": r, "f1": f}

# ------------------------------------------------------------------
# 9.  TrainingArguments & Trainer
# ------------------------------------------------------------------
args = TrainingArguments(
    output_dir=MODEL_DIR,
    num_train_epochs=args_cli.epochs,
    per_device_train_batch_size=16,
    eval_strategy="epoch",
    learning_rate=args_cli.lr,
    weight_decay=args_cli.weight_decay,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=ds["train"],
    eval_dataset=ds["test"],
    compute_metrics=compute_metrics,
    compute_loss_func=weighted_loss,
)

# ------------------------------------------------------------------
# 10. Train, evaluate, save
# ------------------------------------------------------------------
trainer.train()
metrics = trainer.evaluate(ds["test"])
print("Fine-tuned:", metrics)

# ---- report to Vertex AI so HPT can pick the best trial ----
ht = hypertune.HyperTune()
ht.report_hyperparameter_tuning_metric(
    hyperparameter_metric_tag='eval_precision',   # must match “Metric to optimize” in the UI
    metric_value=metrics['eval_precision'],
    global_step=0                   
)

trainer.save_model(MODEL_DIR)
tok.save_pretrained(MODEL_DIR)
