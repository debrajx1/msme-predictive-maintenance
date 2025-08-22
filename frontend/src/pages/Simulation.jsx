import { useState, useEffect, useRef } from "react"; 
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Chart from "../components/Chart.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { getPredictions } from "../services/api.js";

export default function Simulation({ activeMachine, onSimulate }) {
  const { machines, csvUploaded } = useAppContext();
  const [simulationData, setSimulationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(activeMachine || machines?.[0]?.id || "");
  const toastShownRef = useRef(false);

  // Helper: map CSV row data to simulation format
  const mapCsvToSimulation = (rows, machineId) => {
    return rows
      .filter(row => row.Machine_ID === machineId)
      .map((row, i) => ({
        time: `T-${i}`,
        temp: parseFloat(row.Temperature),
        vib: parseFloat(row.Vibration),
        risk: 0.3, // placeholder risk
        confidence: 0.8,
        impact: 5000,
        suggestion: "Monitor machine regularly."
      }));
  };

  // Sync selectedMachine when Dashboard changes activeMachine
  useEffect(() => {
    if (activeMachine && activeMachine !== selectedMachine) {
      setSelectedMachine(activeMachine);
      toastShownRef.current = false; // reset toast for new machine
    }
  }, [activeMachine]);

  // Fetch or load simulation data whenever selectedMachine changes
  useEffect(() => {
    if (!selectedMachine) return;
    setLoading(true);

    const loadSimulation = async () => {
      try {
        let initialData = [];

        if (csvUploaded?.length) {
          // Use CSV data if uploaded
          initialData = mapCsvToSimulation(csvUploaded, selectedMachine);
        }

        if (!initialData.length) {
          // fallback to API predictions
          const { data } = await getPredictions();
          const machineData = (data || []).filter(d => d.machineId === selectedMachine);

          initialData = machineData.map((d, i) => ({
            time: `T-${i}`,
            temp: d.temperature ?? 72 + Math.random() * 2,
            vib: d.vibration ?? 0.03 + Math.random() * 0.01,
            risk: d.risk ?? 0,
            confidence: d.confidence ?? 0,
            impact: d.impact ?? 0,
            suggestion: d.suggestion ?? "Monitor machine regularly."
          }));
        }

        setSimulationData(initialData);

        if (onSimulate && initialData.length > 0) {
          onSimulate({ machineId: selectedMachine, ...initialData.at(-1) });
        }

        if (!toastShownRef.current) {
          toast.success(initialData.length && csvUploaded?.length ? "Simulation loaded from CSV" : "Simulation loaded from pre-trained model");
          toastShownRef.current = true;
        }
      } catch {
        toast.error("Failed to load simulation data");
      } finally {
        setLoading(false);
      }
    };

    loadSimulation();
  }, [selectedMachine, csvUploaded, onSimulate]);

  // Simulate next data point
  const simulateNextPoint = () => {
    setSimulationData(prev => {
      const last = prev.at(-1) || { temp: 72, vib: 0.03, risk: 0.3, confidence: 0.7, impact: 5000 };
      const newPoint = {
        time: `T+${prev.length}`,
        temp: last.temp + (Math.random() - 0.5) * 2,
        vib: last.vib + (Math.random() - 0.5) * 0.01,
        risk: Math.min(Math.max(last.risk + (Math.random() - 0.5) * 0.1, 0), 1),
        confidence: Math.min(Math.max(last.confidence + (Math.random() - 0.5) * 0.05, 0), 1),
        impact: Math.max(last.impact + (Math.random() - 0.5) * 500, 0),
        suggestion: "Monitor machine regularly."
      };

      if (onSimulate) onSimulate({ machineId: selectedMachine, ...newPoint });

      return [...prev.slice(-59), newPoint];
    });
  };

  return (
    <motion.div
      className="mx-auto max-w-5xl space-y-6 px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-white">Machine Simulation</h2>
      <p className="text-slate-400">
        Simulate machine metrics over time using <strong>CSV data or pre-trained AI predictions</strong>.
      </p>

      {/* Machine Selector */}
      <div className="flex items-center gap-4">
        <label className="text-slate-300 font-medium">Select Machine:</label>
        <select
          className="input bg-slate-800 text-white border-slate-700 focus:border-blue-500"
          value={selectedMachine}
          onChange={e => { setSelectedMachine(e.target.value); toastShownRef.current = false; }}
        >
          {machines?.map(m => <option key={m.id} value={m.id}>{m.id}</option>)}
        </select>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={simulateNextPoint}
        >
          Simulate Next Point
        </button>
      </div>

      {/* Chart */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner className="w-10 h-10" />
          <span className="text-slate-400 ml-3">Loading simulation...</span>
        </div>
      ) : (
        <Chart
          title={`Simulation for ${selectedMachine}`}
          data={simulationData}
          yLabel="Value"
        />
      )}

      <div className="mt-4 text-sm text-slate-400 bg-[#1a1c24] p-4 rounded-xl shadow-md">
        <p>
          Note: The simulation shows predicted temperature, vibration, and risk trends from CSV or pre-trained AI model.
        </p>
      </div>
    </motion.div>
  );
}
