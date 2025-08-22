import os, yaml, numpy as np, pandas as pd, joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, precision_recall_curve, auc
from sklearn.ensemble import RandomForestClassifier
from preprocessing import window_to_features

BASE = Path(__file__).resolve().parents[1]
cfg = yaml.safe_load(open(BASE/"configs"/"training_config.yaml"))
dcfg = yaml.safe_load(open(BASE/"configs"/"data_config.yaml"))

np.random.seed(cfg["random_state"])

# ---- synth data generation: healthy vs at-risk windows ----
def synth_window(n=256, at_risk=False):
    # healthy: low noise; at-risk: add impulsive spikes and drift
    x = np.random.normal(0, 0.02, size=n)
    if at_risk:
        idx = np.random.choice(n, size=int(n*0.05), replace=False)
        x[idx] += np.random.normal(0.2, 0.05, size=len(idx))
        x += np.linspace(0, 0.1, n)  # drift
    return x

rows = []
for i in range(cfg["n_samples"]):
    label = np.random.rand() < 0.3  # 30% at-risk
    window = synth_window(cfg["window_size"], at_risk=label)
    temp = 60 + (5 if label else 0) + np.random.randn()*0.8
    current = 5 + (0.8 if label else 0) + np.random.randn()*0.2
    rpm = 1800 + np.random.randint(-30, 30)
    feat = window_to_features(window, temp, current, rpm)
    feat["label"] = int(label)
    rows.append(feat)

df = pd.DataFrame(rows)
X = df[dcfg["features"]]
y = df[dcfg["label_name"]]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=cfg["test_size"], stratify=y, random_state=cfg["random_state"]
)

model = RandomForestClassifier(
    n_estimators=200, max_depth=8, class_weight="balanced", random_state=cfg["random_state"]
)
model.fit(X_train, y_train)

probs = model.predict_proba(X_test)[:,1]
prec, rec, thr = precision_recall_curve(y_test, probs)
pr_auc = auc(rec, prec)
print("PR-AUC:", pr_auc)
print(classification_report(y_test, (probs>0.5).astype(int)))

# save artifacts
MODELS = BASE/"models"
MODELS.mkdir(parents=True, exist_ok=True)
joblib.dump(model, MODELS/"model.joblib")
(X_train.sample(3).to_json(orient="records"))
print("Saved:", MODELS/"model.joblib")
