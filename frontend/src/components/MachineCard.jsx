import { FaTemperatureHigh, FaTachometerAlt } from "react-icons/fa";
import { LineChart, Line, ResponsiveContainer } from "recharts";

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
  sparkline = [], // new prop for trend data [{temp, vib}]
  onClick,
}) {
  const statusColor =
    status === "Healthy"
      ? "bg-green-400/20 text-green-400"
      : status === "Warning"
      ? "bg-yellow-400/20 text-yellow-400"
      : "bg-red-400/20 text-red-400";

  const safeTemp = typeof temp === "number" ? temp.toFixed(1) : "-";
  const safeVib = typeof vib === "number" ? vib.toFixed(3) : "-";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-slate-800/50 p-5 hover:scale-105 hover:shadow-xl transition-transform shadow-md backdrop-blur-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {status}
        </span>
      </div>

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

      {sparkline.length > 0 && (
        <div className="h-16 w-full mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkline}>
              <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="vib" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {risk !== undefined && (
        <div className="text-sm text-slate-300 mb-2">
          <span className="font-medium">Failure Risk:</span> {(risk * 100).toFixed(1)}%
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${risk > 0.7 ? "bg-red-400" : risk > 0.4 ? "bg-yellow-400" : "bg-green-400"}`}
              style={{ width: `${(risk * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {confidence !== undefined && (
        <div className="text-sm text-slate-300 mb-2">
          <span className="font-medium">Confidence:</span> {(confidence * 100).toFixed(1)}%
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${confidence > 0.7 ? "bg-red-400" : confidence > 0.4 ? "bg-yellow-400" : "bg-green-400"}`}
              style={{ width: `${(confidence * 100).toFixed(1)}%` }}
            />
          </div>
        </div>
      )}

      {impact && <div className="text-sm text-slate-300 mt-2">Estimated Cost Saved: ₹{impact.toLocaleString()}</div>}
      {suggestion && <div className="text-sm text-slate-400 mt-2 italic">{suggestion}</div>}

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
