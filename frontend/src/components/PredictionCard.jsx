import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function PredictionCard({ machine, risk, confidence, impact, suggestion, tooltip }) {
  // Determine color based on numeric risk
  const riskColor = (riskValue) => {
    if (riskValue <= 0.4) return "bg-green-400/20 text-green-400";
    if (riskValue <= 0.7) return "bg-yellow-400/20 text-yellow-400";
    return "bg-red-400/20 text-red-400";
  };

  return (
    <div className="rounded-2xl bg-slate-800/50 p-5 shadow-lg backdrop-blur-md hover:scale-105 transition-transform">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {machine && <span className="font-semibold text-white text-lg">{machine}</span>}
        {risk !== undefined && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColor(risk)}`}>
            {(risk * 100).toFixed(0)}% Risk
          </span>
        )}
      </div>

      {/* Confidence */}
      {confidence !== undefined && (
        <div className="text-slate-300 mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Confidence</span>
            <span>{(confidence * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-blue-400 transition-all"
              style={{ width: `${(confidence * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {/* Estimated Impact */}
      {impact !== undefined && (
        <div className="text-slate-300 mb-2">
          <span className="font-medium">Estimated Cost Saved:</span> ₹{impact.toLocaleString()}
        </div>
      )}

      {/* Suggested Action */}
      {suggestion && (
        <div className="mt-2 text-slate-300 font-medium flex items-center gap-2">
          <FaCheckCircle className="text-green-400" />
          <span>{suggestion}</span>
        </div>
      )}

      {/* Optional Tooltip / Feature Importance */}
      {tooltip && tooltip.length > 0 && (
        <div className="mt-3 text-xs text-slate-400">
          <span className="font-medium">Top Features: </span>
          {tooltip.map((t, i) => (
            <span key={i}>
              {t.feature} ({(t.importance * 100).toFixed(1)}%)
              {i < tooltip.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
