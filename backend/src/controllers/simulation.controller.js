/**
 * Run a simulation for a machine over multiple hours
 * Supports multi-point simulation for dashboard
 */
export const runSimulation = async (req, res, next) => {
  try {
    const { machineId = "machineA", hours = 1, points = 5 } = req.body || {};

    const result = [];
    let temp = 60 + Math.random() * 5;
    let vib = 0.03 + Math.random() * 0.01;

    for (let i = 0; i < points; i++) {
      temp = Math.round((temp + Math.random() * 2) * 10) / 10;
      vib = Math.round((vib + Math.random() * 0.01) * 1000) / 1000;

      const risk = Math.max(0, Math.min(1, (vib / 0.1) * 0.5 + (temp / 120) * 0.5));
      const confidence = 0.88;
      const impact = Math.round(risk * 20000);
      const suggestion =
        risk >= 0.7 ? "Immediate inspection recommended." :
        risk >= 0.4 ? "Monitor closely." : "Normal operation.";

      result.push({ machineId, temp, vib, risk, confidence, impact, suggestion });
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};
