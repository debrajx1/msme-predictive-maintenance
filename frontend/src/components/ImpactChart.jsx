import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function ImpactChart({ data = [] }) {
  const safeData = (Array.isArray(data) ? data : []).map((d) => ({
    machine: d.machine || "Unknown",
    impact: typeof d.impact === "number" ? d.impact : 0,
    risk: ["High", "Medium", "Low"].includes(d.risk) ? d.risk : "Low",
    topFeature: d.topFeature || "",
  }));

  const getColor = (risk) => {
    if (risk === "High") return "#ef4444";   // red-500
    if (risk === "Medium") return "#facc15"; // yellow-400
    return "#22c55e";                        // green-500
  };

  return (
    <div className="card p-5 bg-[#1a1c24] rounded-xl shadow-md">
      <h3 className="text-white font-semibold mb-3">Estimated Cost Savings</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={safeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="machine" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const { impact, topFeature, risk } = payload[0].payload;
                  return (
                    <div className="p-3 rounded-xl bg-[#0f1115] border border-white/10 shadow-lg text-sm text-slate-200">
                      <p className="font-semibold text-white">{label}</p>
                      <p>
                        💰 Savings:{" "}
                        <span className="text-blue-400">
                          ₹{typeof impact === "number" ? impact.toLocaleString() : 0}
                        </span>
                      </p>
                      <p>
                        ⚠️ Risk: <span style={{ color: getColor(risk) }}>{risk}</span>
                      </p>
                      {topFeature && <p>📊 Top Factor: <span className="text-emerald-400">{topFeature}</span></p>}
                    </div>
                  );
                }
                return null;
              }}
            />
            <AnimatePresence>
              <Bar dataKey="impact">
                {safeData.map((entry, index) => (
                  <motion.g
                    key={`cell-${index}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Cell fill={getColor(entry.risk)} />
                  </motion.g>
                ))}
              </Bar>
            </AnimatePresence>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
