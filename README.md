# MSME Predictive Maintenance — MVP (Scalable Scaffold)

Services:
- MongoDB
- Backend (Node/Express)
- Model Server (Python/FastAPI)
- Frontend (React/Vite)

Run:
1) docker compose up --build
2) Open http://localhost:5173

API:
- POST /api/data  (ingest telemetry JSON)
- GET  /api/data?machine_id=...&limit=...
- POST /api/predict (predict risk from last N readings or custom payload)

Model Server:
- POST /predict { features OR raw window } -> { risk_prob, label, top_features[] }

Training:
- The model container runs `train_model.py` once on startup (synthetic data), writes `/app/models/model.joblib`.
