import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useMemo, useEffect, useState } from "react";

export default function Chart({ title = "Live Metrics", data = [], yLabel = "Value", onPointClick }) {
  // Keep last 60 points
  const series = useMemo(() => data.slice(-60), [data]);

  // Local state for chart data (used for animation)
  const [chartData, setChartData] = useState(series);

  useEffect(() => {
    setChartData(series);
  }, [series]);

  // Dynamic Y-axis domain to include temp, vib, and risk
  const yDomain = useMemo(() => {
    const temps = series.map(d => d.temp).filter(v => v != null);
    const vibs = series.map(d => d.vib).filter(v => v != null);
    const risks = series.map(d => d.risk).filter(v => v != null);
    const all = [...temps, ...vibs, ...risks];
    const min = Math.min(...all, 0);
    const max = Math.max(...all, 1);
    return [min * 0.95, max * 1.05];
  }, [series]);

  return (
    <div className="rounded-2xl bg-slate-800/50 p-5 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="text-xs text-slate-400">Last {series.length} samples</div>
      </div>

      <div className="h-64">
        {series.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={yDomain}
                label={{
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft",
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f1115",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "10px",
                }}
                labelStyle={{ color: "#e2e8f0", fontWeight: 500 }}
                formatter={(value, name) => [
                  value,
                  name === "temp"
                    ? "Temperature (°C)"
                    : name === "vib"
                    ? "Vibration (g)"
                    : "Risk",
                ]}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />

              {/* Temperature Line */}
              <Line
                type="monotone"
                dataKey="temp"
                name="Temperature (°C)"
                stroke="url(#tempGradient)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={800}
                onClick={onPointClick}
              />

              {/* Vibration Line */}
              <Line
                type="monotone"
                dataKey="vib"
                name="Vibration (g)"
                stroke="url(#vibGradient)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={800}
                onClick={onPointClick}
              />

              {/* Risk Line */}
              <Line
                type="monotone"
                dataKey="risk"
                name="Risk"
                stroke="url(#riskGradient)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={800}
                onClick={onPointClick}
              />

              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="vibGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
