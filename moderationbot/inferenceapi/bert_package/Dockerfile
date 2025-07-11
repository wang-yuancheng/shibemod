# This file contains code for the dockerfile used on Vertex AI Workbench

FROM gcr.io/deeplearning-platform-release/pytorch-gpu.2-3

RUN pip install --no-cache-dir --upgrade --pre \
        --extra-index-url https://download.pytorch.org/whl/nightly/cu118 \
        torch torchvision \
 && pip uninstall -y torch_xla \
 && pip install --no-cache-dir \
        transformers datasets scikit-learn gcsfs google-cloud-storage \
        "accelerate>=0.26.0" cloudml-hypertune

WORKDIR /app
COPY trainer /app/trainer

ENTRYPOINT ["python", "-m", "trainer.task"]
