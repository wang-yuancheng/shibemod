FROM python:3.11-slim

WORKDIR /inferenceapi

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir fastapi uvicorn pydantic torch transformers

COPY main.py ./
COPY model ./model

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
