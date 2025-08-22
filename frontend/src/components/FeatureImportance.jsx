import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function FeatureImportance({ data = [] }) {
  // Ensure data is an array of valid numbers
  const safeData = (Array.isArray(data) ? data : []).map(d => ({
    feature: d.feature || "Unknown",
    importance: typeof d.importance === "number" ? d.importance : 0,
  }));

  return (
    <div className="card p-5 bg-[#1a1c24] rounded-xl shadow-md">
      <h3 className="text-white font-semibold mb-3">Feature Importance</h3>

      {safeData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
          No feature importance data available
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={safeData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                domain={[0, "dataMax"]}
              />
              <YAxis
                type="category"
                dataKey="feature"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f1115",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "#e2e8f0" }}
                formatter={(value) =>
                  typeof value === "number" ? [`${(value * 100).toFixed(1)}%`, "Importance"] : [value, "Importance"]
                }
              />
              <Bar
                dataKey="importance"
                fill="url(#colorGradient)"
                radius={[0, 6, 6, 0]}
                isAnimationActive={true}
                animationDuration={800}
              >
                <LabelList
                  dataKey="importance"
                  position="right"
                  formatter={(val) =>
                    typeof val === "number" ? `${(val * 100).toFixed(0)}%` : "0%"
                  }
                  style={{ fill: "#facc15", fontSize: 12, fontWeight: 500 }}
                />
              </Bar>

              {/* Gradient Fill */}
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
