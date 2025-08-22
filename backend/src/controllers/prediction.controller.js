import Telemetry from "../models/Telemetry.js";
import { predictFromWindowOrFeatures } from "../services/predictionService.js";

/**
 * Fallback risk computation if ML prediction fails
 */
function fallbackRule({ temp, vib, usage }) {
  const risk = Math.max(0, Math.min(1, (vib / 0.1) * 0.5 + (temp / 120) * 0.4 + (usage / 500) * 0.1));
  const confidence = 0.85;
  const impact = Math.round(risk * 20000);
  const label = risk >= 0.7 ? "High" : risk >= 0.4 ? "Medium" : "Low";
  const suggestion =
    risk >= 0.7 ? "Immediate inspection recommended." :
    risk >= 0.4 ? "Monitor closely." : "Normal operation.";
  const featureImportance = [
    { feature: "Temperature", importance: 0.4 },
    { feature: "Vibration", importance: 0.5 },
    { feature: "Usage", importance: 0.1 },
  ];
  return { risk, confidence, impact, label, suggestion, featureImportance };
}

/**
 * Predict single machine risk from current readings
 */
export const postPredict = async (req, res, next) => {
  try {
    const { machineId = "machineA", temperature, vibration, usage } = req.body || {};

    try {
      const ml = await predictFromWindowOrFeatures({
        temp_c: temperature,
        vibration_window: undefined,
        usage_hours: usage,
      });

      const risk = ml?.risk_prob ?? 0.5;
      const confidence = ml?.confidence ?? 0.9;
      const impact = Math.round(risk * 20000);
      const suggestion = ml?.suggestion ?? fallbackRule({ temp: temperature, vib: vibration, usage }).suggestion;
      const featureImportance = ml?.top_features ?? fallbackRule({ temp: temperature, vib: vibration, usage }).featureImportance;

      res.json({ machineId, risk, confidence, impact, suggestion, featureImportance });
    } catch {
      const fb = fallbackRule({ temp: temperature, vib: vibration, usage });
      res.json({ machineId, ...fb });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * List predictions for all machines (latest telemetry)
 */
export const listPredictions = async (req, res, next) => {
  try {
    const agg = await Telemetry.aggregate([
      { $sort: { machine_id: 1, ts: -1 } },
      { $group: { _id: "$machine_id", doc: { $first: "$$ROOT" } } },
    ]);

    const predictions = agg.map(({ _id, doc }) => {
      const { temp, vib, usage } = doc;
      const fallback = fallbackRule({ temp, vib, usage });
      return { machineId: _id, ...fallback };
    });

    res.json(predictions);
  } catch (err) {
    next(err);
  }
};
