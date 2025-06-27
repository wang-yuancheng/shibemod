from pathlib import Path
import torch
from transformers import AutoConfig, AutoTokenizer, AutoModelForSequenceClassification

# Get absolute path to current directory
MODEL_DIR = Path(__file__).resolve().parent  

# Load everything once when the module is imported
config    = AutoConfig.from_pretrained(MODEL_DIR)
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model     = AutoModelForSequenceClassification.from_pretrained(
    MODEL_DIR,
    config=config,
    use_safetensors=True
)
model.eval()  # switch to inference mode

def classify_sentence(text):
    # Tokenize and run through the model
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        logits = model(**inputs).logits
        prob  = torch.softmax(logits, dim=1).squeeze().tolist()
        label   = int(torch.argmax(logits, dim=-1).item())
    return label, prob