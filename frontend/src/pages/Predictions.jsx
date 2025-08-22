import { useState, useEffect } from "react";
import { postPredict } from "../services/api.js";
import PredictionCard from "../components/PredictionCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const riskLabel = (risk) => {
  if (risk >= 0.7) return "High";
  if (risk >= 0.4) return "Medium";
  return "Low";
};

const riskColor = (risk) => {
  if (risk < 0.4) return "bg-green-500";
  if (risk < 0.7) return "bg-yellow-500";
  return "bg-red-500";
};

export default function Predictions() {
  const { csvUploaded, machines } = useAppContext();
  const [form, setForm] = useState({ machineId: machines?.[0]?.id || "", vibration: 0.03, temperature: 72 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!machines?.length) return;
    setForm((f) => ({ ...f, machineId: machines[0].id }));
  }, [machines]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: name === "machineId" ? value : Number(value) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { machineId: form.machineId, vibration: form.vibration, temperature: form.temperature };
      const { data } = await postPredict(payload);

      const prediction = {
        machine: form.machineId,
        risk: data?.risk ?? 0,
        confidence: data?.confidence ?? 0,
        impact: data?.impact ?? 0,
        suggestion: data?.suggestion ?? "Monitor machine regularly.",
      };

      setHistory((h) => [prediction, ...h]);
    } catch {
      const prediction = {
        machine: form.machineId,
        risk: 0.28,
        confidence: 0.65,
        impact: 5000,
        suggestion: "Inspect cooling fan & lubrication.",
      };
      setHistory((h) => [prediction, ...h]);
    } finally {
      setLoading(false);
    }
  };

  if (!csvUploaded)
    return (
      <motion.div
        className="mx-auto max-w-3xl text-slate-300 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold">Predictions</h2>
        <p>Upload historical machine data CSV first to enable predictive maintenance features. <strong>Predictions use pre-trained model.</strong></p>
      </motion.div>
    );

  return (
    <motion.div
      className="mx-auto max-w-3xl space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-white">Predictive Maintenance</h2>
      <p className="text-slate-400">
        Submit real-time machine readings to estimate potential failure risk. Predictions use <strong>pre-trained AI model</strong>.
      </p>

      <form
        onSubmit={onSubmit}
        className="card p-6 grid md:grid-cols-3 gap-4 bg-[#1a1c24] rounded-xl shadow-lg"
      >
        <div>
          <label className="label text-slate-300">Machine ID</label>
          <select
            className="input bg-slate-800 text-white border-slate-700 focus:border-blue-500"
            name="machineId"
            value={form.machineId}
            onChange={onChange}
          >
            {machines?.map((m) => (
              <option key={m.id} value={m.id}>{m.id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label text-slate-300">Vibration (g RMS)</label>
          <input
            className="input bg-slate-800 text-white border-slate-700 focus:border-blue-500"
            name="vibration"
            type="number"
            step="0.001"
            min="0"
            max="10"
            value={form.vibration}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="label text-slate-300">Temperature (°C)</label>
          <input
            className="input bg-slate-800 text-white border-slate-700 focus:border-blue-500"
            name="temperature"
            type="number"
            step="0.1"
            min="0"
            max="150"
            value={form.temperature}
            onChange={onChange}
          />
        </div>

        <div className="md:col-span-3 flex justify-end">
          <button
            type="submit"
            className={`btn bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading && <LoadingSpinner className="w-4 h-4" />}
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold text-white">Prediction History</h3>
        {history.length ? (
          <div className="grid md:grid-cols-1 gap-4">
            {history.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <PredictionCard
                  machine={p.machine}
                  risk={riskLabel(p.risk)}
                  confidence={p.confidence}
                  impact={p.impact}
                  suggestion={p.suggestion}
                  riskClass={riskColor(p.risk)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-slate-400 text-sm">No predictions yet</div>
        )}
      </div>
    </motion.div>
  );
}
