import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useMemo } from "react";

/**
 * Props:
 * liveData: live metrics [{time, temp, vib}, ...]
 * simulationData: simulation [{time, temp, vib}, ...]
 */
export default function CombinedChart({ liveData = [], simulationData = [], title = "Live + Simulation", yLabel = "Value" }) {
  // Merge last 60 points from both datasets
  const mergedData = useMemo(() => {
    const live = Array.isArray(liveData) ? liveData.slice(-60) : [];
    const sim = Array.isArray(simulationData) ? simulationData.slice(-60) : [];
    // Align by index
    return live.map((point, i) => ({
      time: point.time,
      liveTemp: point.temp,
      liveVib: point.vib,
      simTemp: sim[i]?.temp ?? null,
      simVib: sim[i]?.vib ?? null,
    }));
  }, [liveData, simulationData]);

  if (!mergedData.length) {
    return (
      <div className="rounded-2xl bg-slate-800/50 p-5 shadow-lg flex justify-center items-center h-64">
        <span className="text-slate-400">No data available</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-800/50 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="text-xs text-slate-400">Last {mergedData.length} samples</div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#0f1115", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
            />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />

            {/* Live metrics */}
            <Line type="monotone" dataKey="liveTemp" name="Live Temp (°C)" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="liveVib" name="Live Vib (g)" stroke="#10b981" strokeWidth={2} dot={false} />

            {/* Simulation metrics */}
            <Line type="monotone" dataKey="simTemp" name="Sim Temp (°C)" stroke="#facc15" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="simVib" name="Sim Vib (g)" stroke="#f472b6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
