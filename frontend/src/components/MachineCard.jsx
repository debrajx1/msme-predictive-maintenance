import { FaTemperatureHigh, FaTachometerAlt } from "react-icons/fa";

export default function MachineCard({
  name,
  status = "Healthy",
  temp,
  vib,
  risk,
  confidence,
  impact,
  suggestion,
  tooltip,
  onClick,
}) {
  // Status badge colors
  const statusColor =
    status === "Healthy"
      ? "bg-green-400/20 text-green-400"
      : status === "Warning"
      ? "bg-yellow-400/20 text-yellow-400"
      : "bg-red-400/20 text-red-400";

  // Safely handle undefined or NaN values
  const safeRisk = typeof risk === "number" && !isNaN(risk) ? risk : 0;
  const safeConfidence = typeof confidence === "number" && !isNaN(confidence) ? confidence : 0;
  const safeTemp = typeof temp === "number" && !isNaN(temp) ? temp.toFixed(1) : "-";
  const safeVib = typeof vib === "number" && !isNaN(vib) ? vib.toFixed(3) : "-";

  // Progress bar colors
  const riskColor =
    safeRisk > 0.7 ? "bg-red-400" : safeRisk > 0.4 ? "bg-yellow-400" : "bg-green-400";
  const confidenceColor =
    safeConfidence > 0.7 ? "bg-red-400" : safeConfidence > 0.4 ? "bg-yellow-400" : "bg-green-400";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-slate-800/50 p-5 hover:scale-105 hover:shadow-xl transition-transform shadow-md backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {status}
        </span>
      </div>

      {/* Metrics */}
      {temp !== undefined && vib !== undefined && (
        <div className="text-sm text-slate-300 mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <FaTemperatureHigh className="text-red-400" />
            <span>Temperature: {safeTemp}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-blue-400" />
            <span>Vibration: {safeVib} g</span>
          </div>
        </div>
      )}

      {/* Risk */}
      {risk !== undefined && (
        <div className="text-sm text-slate-300 mb-2">
          <span className="font-medium">Failure Risk:</span> {(safeRisk * 100).toFixed(1)}%
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full transition-all ${riskColor}`}
              style={{ width: `${(safeRisk * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {/* Prediction Confidence */}
      {confidence !== undefined && (
        <div className="text-sm text-slate-300 mb-2">
          <span className="font-medium">Confidence:</span> {(safeConfidence * 100).toFixed(1)}%
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full transition-all ${confidenceColor}`}
              style={{ width: `${(safeConfidence * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {/* Estimated Impact */}
      {impact !== undefined && impact !== null && (
        <div className="text-sm text-slate-300 mt-2">
          <span className="font-medium">Estimated Cost Saved:</span> ₹{impact.toLocaleString()}
        </div>
      )}

      {/* Suggestion */}
      {suggestion && (
        <div className="text-sm text-slate-400 mt-2 italic">{suggestion}</div>
      )}

      {/* Optional tooltip for feature importance */}
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
