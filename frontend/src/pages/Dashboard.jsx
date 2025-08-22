// Dashboard.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { getLatestMetrics, getPredictions } from "../services/api.js";
import { useAppContext } from "../context/AppContext.jsx";
import MachineCard from "../components/MachineCard.jsx";
import FeatureImportance from "../components/FeatureImportance.jsx";
import ImpactChart from "../components/ImpactChart.jsx";
import AlertCard from "../components/AlertCard.jsx";
import CombinedChart from "../components/CombinedChart.jsx";
import Simulation from "./Simulation.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { Link } from "react-router-dom";

const toTime = (d) =>
  new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const riskLabel = (value) =>
  value >= 0.7 ? "High" : value >= 0.4 ? "Medium" : "Low";

const riskStatus = (value) =>
  value >= 0.7 ? "Critical" : value >= 0.4 ? "Warning" : "Healthy";

export default function Dashboard() {
  const { csvUploaded, predictions = [], setPredictions } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [machines, setMachines] = useState([]);
  const [active, setActive] = useState("");
  const [series, setSeries] = useState([{ time: "T-0", temp: 72, vib: 0.03 }]);
  const [simulationData, setSimulationData] = useState([]);
  const simulationRef = useRef([]);

  // Fetch predictions
  useEffect(() => {
    if (!csvUploaded) return;

    const fetchPredictions = async () => {
      try {
        const { data } = await getPredictions();
        const preds = data || [];
        setPredictions(preds);

        const machineList = preds.map((p) => ({
          id: p.machineId,
          status: riskStatus(p.risk),
        }));
        setMachines(machineList);
        if (!active && machineList.length > 0) setActive(machineList[0].id);
      } catch {
        // fallback demo
        const demo = [
          { machineId: "machineA", risk: 0.3, confidence: 0.85, impact: 5000, suggestion: "Monitor regularly." },
          { machineId: "machineB", risk: 0.8, confidence: 0.95, impact: 12000, suggestion: "Inspect immediately." },
          { machineId: "machineC", risk: 0.5, confidence: 0.9, impact: 8000, suggestion: "Check lubrication & temperature." },
        ];
        setPredictions(demo);
        const demoMachines = demo.map((p) => ({ id: p.machineId, status: riskStatus(p.risk) }));
        setMachines(demoMachines);
        if (!active) setActive(demoMachines[0].id);
      }
    };

    fetchPredictions();
  }, [csvUploaded, setPredictions]);

  // Fetch live metrics
  useEffect(() => {
    if (!active) return;
    let mounted = true;

    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const { data } = await getLatestMetrics({ machineId: active });
        const rows = (data?.metrics || []).slice(-60).map((r) => ({
          time: toTime(r.ts ?? Date.now()),
          temp: r.temp ?? r.temperature ?? 0,
          vib: r.vib ?? r.vibration ?? 0,
        }));
        if (mounted) setSeries(rows.length ? rows : [{ time: "T-0", temp: 72, vib: 0.03 }]);
      } catch {
        // fallback simulation
        const demo = Array.from({ length: 60 }, (_, i) => ({
          time: `${i}`.padStart(2, "0") + ":00",
          temp: 60 + Math.sin(i / 6) * 8 + (active === "machineB" ? 5 : 0),
          vib: 0.03 + Math.sin(i / 8) * 0.01 + (active === "machineB" ? 0.02 : 0),
        }));
        setSeries(demo);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const intervalId = setInterval(fetchMetrics, 8000);
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [active]);

  const activeInfo = useMemo(() => {
    const last = series.at(-1) || { temp: 0, vib: 0 };
    const temp = Number(last.temp.toFixed(1));
    const vib = Number(last.vib.toFixed(3));
    const pred = predictions.find((p) => p.machineId === active) || {};
    return {
      temp,
      vib,
      confidence: pred?.confidence ?? 0,
      impact: pred?.impact ?? 0,
      risk: riskLabel(pred?.risk ?? 0),
      suggestion: pred?.suggestion ?? "Monitor machine regularly.",
      featureImportance: pred?.featureImportance || [
        { feature: "Temperature", importance: 0.5 },
        { feature: "Vibration", importance: 0.3 },
        { feature: "Usage", importance: 0.2 },
      ],
    };
  }, [series, predictions, active]);

  // Handle simulation updates
  const handleSimulationUpdate = ({ machineId, temp, vib, risk, confidence, impact, suggestion }) => {
    setSimulationData((prev) => {
      const next = [...prev.slice(-59), { time: toTime(Date.now()), temp, vib }];
      simulationRef.current = next;
      return next;
    });

    setPredictions((prev) => {
      const idx = prev.findIndex((p) => p.machineId === machineId);
      const newPred = { machineId, risk, confidence, impact, suggestion };
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = newPred;
        return updated;
      }
      return [...prev, newPred];
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400">Real-time machine health & predictive maintenance overview</p>
        </div>
        <div className="flex gap-4">
          <Link to="/upload" className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Upload Data</Link>
          <Link to="/predictions" className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Predictions</Link>
        </div>
      </div>

      {/* Machine Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {machines.length === 0
          ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 bg-gray-800/50 rounded-lg animate-pulse" />)
          : machines.map((m) => (
              <MachineCard
                key={m.id}
                name={m.id}
                status={m.status}
                temp={active === m.id ? activeInfo.temp : undefined}
                vib={active === m.id ? activeInfo.vib : undefined}
                confidence={active === m.id ? activeInfo.confidence : undefined}
                impact={active === m.id ? activeInfo.impact : undefined}
                onClick={() => setActive(m.id)}
                tooltip={active === m.id ? activeInfo.featureImportance : undefined}
              />
            ))}
      </div>

      {/* Combined Live + Simulation Chart */}
      <CombinedChart title={`Machine Trends — ${active}`} liveData={series} simulationData={simulationRef.current} />

      {/* Simulation Controls */}
      <Simulation activeMachine={active} onSimulate={handleSimulationUpdate} />

      {/* Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">All Machine Alerts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {(predictions || []).slice().sort((a, b) => (b.risk ?? 0) - (a.risk ?? 0)).map((p) => (
            <AlertCard key={p.machineId} machine={p.machineId} risk={riskLabel(p.risk ?? 0)} message={p.suggestion ?? "Monitor machine regularly."} topFeatures={p.featureImportance ?? []} />
          ))}
        </div>
      </div>

      {/* Feature Importance & Impact */}
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureImportance data={activeInfo.featureImportance} />
        <ImpactChart data={(predictions || []).map((p) => ({ machine: p.machineId, impact: p.impact ?? 0, risk: riskLabel(p.risk ?? 0), topFeature: p.featureImportance?.[0]?.feature }))} />
      </div>

      {loading && (
        <div className="mt-4 text-sm text-slate-400 flex items-center gap-2">
          <LoadingSpinner /> Updating metrics…
        </div>
      )}
    </div>
  );
}
