import numpy as np
import pandas as pd
from scipy.stats import kurtosis

def vib_rms(x: np.ndarray) -> float:
    return float(np.sqrt(np.mean(x**2)))

def vib_kurtosis(x: np.ndarray) -> float:
    return float(kurtosis(x, fisher=True, bias=False))

def window_to_features(window: np.ndarray, temp_c: float, current_a: float, rpm: float) -> dict:
    return {
        "vib_rms": vib_rms(window),
        "vib_kurtosis": vib_kurtosis(window),
        "temp_c": float(temp_c),
        "current_a": float(current_a),
        "rpm": float(rpm),
    }

def df_from_records(records) -> pd.DataFrame:
    return pd.DataFrame.from_records(records)
