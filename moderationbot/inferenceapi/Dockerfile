FROM python:3.11-slim

WORKDIR /inferenceapi

RUN pip install --no-cache-dir fastapi uvicorn pydantic torch transformers

COPY main.py ./
COPY model ./model

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
