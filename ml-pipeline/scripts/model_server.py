from fastapi import FastAPI, Body
from pydantic import BaseModel, Field
import joblib, numpy as np, os
from pathlib import Path
from preprocessing import window_to_features

class PredictRequest(BaseModel):
    # Either provide pre-computed features OR a raw window + context
    features: dict | None = None
    vibration_window: list[float] | None = None
    temp_c: float | None = None
    current_a: float | None = None
    rpm: float | None = None

class PredictResponse(BaseModel):
    risk_prob: float
    label: str
    top_features: list[list] = Field(default_factory=list)

app = FastAPI(title="PdM Model Server")

BASE = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE/"models"/"model.joblib"
model = joblib.load(MODEL_PATH)

ORDER = ["vib_rms","vib_kurtosis","temp_c","current_a","rpm"]

def top_features_approx(feats: dict, probs: float):
    # naive: absolute deviation from healthy-ish nominal
    nominal = {"vib_rms":0.02,"vib_kurtosis":0.0,"temp_c":60,"current_a":5,"rpm":1800}
    diffs = {k: abs(feats[k]-nominal[k]) for k in feats}
    ranked = sorted(diffs.items(), key=lambda kv: kv[1], reverse=True)[:3]
    return [[k, float(v)] for k,v in ranked]

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest = Body(...)):
    if req.features is None:
        if req.vibration_window is None:
            return PredictResponse(risk_prob=0.0, label="OK", top_features=[])
        feats = window_to_features(
            np.array(req.vibration_window, dtype=float),
            req.temp_c or 60.0, req.current_a or 5.0, req.rpm or 1800.0
        )
    else:
        feats = req.features

    X = [[feats[k] for k in ORDER]]
    prob = float(model.predict_proba(X)[0,1])
    label = "At-risk" if prob >= 0.5 else "OK"
    return PredictResponse(risk_prob=prob, label=label, top_features=top_features_approx(feats, prob))
