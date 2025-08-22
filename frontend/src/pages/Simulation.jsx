import { useState, useEffect } from "react";

export default function Simulation({ activeMachine, onSimulate }) {
  const [temp, setTemp] = useState(72);
  const [vib, setVib] = useState(0.03);
  const [preset, setPreset] = useState("Normal");

  // Preset options
  const presets = {
    Normal: { temp: 72, vib: 0.03 },
    Hot: { temp: 90, vib: 0.04 },
    Vibrating: { temp: 70, vib: 0.08 },
    Critical: { temp: 95, vib: 0.1 },
  };

  useEffect(() => {
    if (preset in presets) {
      setTemp(presets[preset].temp);
      setVib(presets[preset].vib);
    }
  }, [preset]);

  const handleSimulate = () => {
    const risk = Math.min(1, (temp - 60) / 50 + (vib - 0.03) * 5); // simplified risk
    const confidence = Math.min(1, risk + 0.1);
    const impact = Math.round(risk * 10000);
    const suggestion = risk > 0.7 ? "Inspect immediately" : risk > 0.4 ? "Check regularly" : "Monitor";

    onSimulate({ machineId: activeMachine, temp, vib, risk, confidence, impact, suggestion });
  };

  return (
    <div className="card p-4 bg-slate-800/50 rounded-xl shadow-md space-y-4">
      <h3 className="text-white font-semibold">Simulation Controls — {activeMachine}</h3>

      {/* Presets */}
      <div className="flex gap-2">
        {Object.keys(presets).map((p) => (
          <button
            key={p}
            className={`px-3 py-1 rounded ${preset === p ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300"}`}
            onClick={() => setPreset(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-2">
        <div>
          <label className="text-slate-300">Temperature (°C): {temp.toFixed(1)}</label>
          <input
            type="range"
            min="60"
            max="120"
            step="0.1"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-slate-300">Vibration (g RMS): {vib.toFixed(3)}</label>
          <input
            type="range"
            min="0"
            max="0.15"
            step="0.001"
            value={vib}
            onChange={(e) => setVib(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={handleSimulate}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
      >
        Run Simulation
      </button>

      {/* Live Preview */}
      <div className="text-slate-300 text-sm">
        <p>Preview Risk: <span className="font-medium">{((temp - 60) / 50 + (vib - 0.03) * 5).toFixed(2)}</span></p>
      </div>
    </div>
  );
}
