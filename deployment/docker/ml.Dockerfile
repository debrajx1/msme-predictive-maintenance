FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
COPY ml-pipeline/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ml-pipeline/ ./ 
# Train a toy model on container start if missing, then run model server
EXPOSE 8000
CMD bash -lc "if [ ! -f models/model.joblib ]; then python scripts/train_model.py; fi && uvicorn scripts.model_server:app --host 0.0.0.0 --port 8000"
