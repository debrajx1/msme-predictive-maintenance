import { motion } from "framer-motion";

/**
 * @param {string} machine - Machine ID
 * @param {"High" | "Medium" | "Low"} risk - Risk label
 * @param {string} message - Base message or suggestion
 * @param {Array<{feature: string, importance: number}>} topFeatures - Optional: top features to highlight
 */
export default function AlertCard({ machine = "Unknown", risk = "Low", message = "No message available", topFeatures = [] }) {
  // Safe risk color mapping
  const riskColor =
    risk === "High"
      ? "bg-red-500/20 text-red-400"
      : risk === "Medium"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-green-500/20 text-green-400";

  // Optional top feature display
  const topFeature =
    topFeatures.length > 0 && topFeatures[0]?.feature
      ? `Top factor: ${topFeatures[0].feature} (${((topFeatures[0].importance ?? 0) * 100).toFixed(0)}%)`
      : "";

  return (
    <motion.div
      className={`rounded-xl p-4 shadow-lg border border-white/10 ${riskColor} mb-2 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-white">{machine}</span>
        <span className="font-medium">{risk} Risk</span>
      </div>
      <p className="text-slate-300 text-sm">{message}</p>
      {topFeature && <p className="text-slate-400 text-xs mt-1">{topFeature}</p>}
    </motion.div>
  );
}
