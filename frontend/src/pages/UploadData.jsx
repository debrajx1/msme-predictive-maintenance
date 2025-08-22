import { useState } from "react"; 
import { uploadCSV, getPredictions } from "../services/api.js";
import FileUpload from "../components/FileUpload.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const riskLabel = (value) => {
  if (value >= 0.7) return "High";
  if (value >= 0.4) return "Medium";
  return "Low";
};

export default function UploadData() {
  const { setCsvUploaded, setPredictions } = useAppContext();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const onUpload = async () => {
    if (!file) return setMsg("Please select a CSV file first.");

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Invalid file type. Please upload a CSV file.");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      // Upload CSV (storage only)
      const { data } = await uploadCSV(file);
      setMsg("CSV uploaded for storage only. Model is pre-trained.");
      setCsvUploaded(true);

      // Preview first 5 lines
      const text = await file.text();
      setPreview(text.split("\n").slice(0, 5).join("\n"));

      // Fetch predictions using pre-trained model
      try {
        const { data: predictions } = await getPredictions();
        const mapped = (predictions || []).map((p) => ({
          ...p,
          risk: riskLabel(p.risk),
        }));
        setPredictions(mapped);
        toast.success(`Predictions updated for ${mapped.length} machines!`);
      } catch {
        const demo = [
          { machineId: "machineA", risk: "Low", confidence: 0.85, impact: 5000, suggestion: "Monitor regularly." },
          { machineId: "machineB", risk: "High", confidence: 0.95, impact: 12000, suggestion: "Inspect immediately." },
          { machineId: "machineC", risk: "Medium", confidence: 0.9, impact: 8000, suggestion: "Check lubrication & temperature." },
        ];
        setPredictions(demo);
        toast("Predictions loaded with demo data.", { icon: "⚠️" });
      }
    } catch (e) {
      setMsg("Upload failed. Ensure backend /data/upload is reachable.");
      setPreview("");
      toast.error("CSV upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="mx-auto max-w-3xl space-y-6 px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-white">Upload Historical Machine Data</h2>
      <p className="text-slate-400">
        Upload your historical machine metrics (timestamp, machineId, temperature, vibration, label) for storage. <strong>AI predictions use a pre-trained model.</strong>
      </p>

      <FileUpload onFile={setFile} />

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onUpload}
          disabled={loading || !file}
          className={`px-6 py-3 font-semibold rounded-lg shadow-lg text-white transition-all duration-300
            bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500
            hover:scale-105 hover:from-blue-600 hover:to-indigo-600
            ${loading || !file ? "opacity-70 cursor-not-allowed hover:scale-100" : ""}`}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
        {file && <span className="text-sm text-slate-300">{file.name}</span>}
      </div>

      {msg && <div className="text-sm text-slate-300 mt-2">{msg}</div>}

      {preview && (
        <motion.div
          className="mt-6 card p-5 bg-[#1a1c24] shadow-md rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="font-semibold mb-2 text-white">CSV Preview (first 5 lines)</h3>
          <pre className="text-xs text-slate-300 break-words whitespace-pre-wrap max-h-40 overflow-y-auto p-2 bg-[#121317] rounded-md">
            {preview}
          </pre>
        </motion.div>
      )}

      <div className="mt-6 card p-5 bg-[#1a1c24] rounded-xl shadow-md">
        <h3 className="font-semibold mb-2 text-white">CSV Format Example</h3>
        <pre className="text-xs text-slate-300 break-words whitespace-pre-wrap max-h-40 overflow-y-auto p-2 bg-[#121317] rounded-md">
timestamp,machineId,temperature,vibration,label
2025-08-18T14:20:00Z,machineA,72,0.032,0
2025-08-18T14:21:00Z,machineA,72.5,0.031,0
2025-08-18T14:22:00Z,machineA,78.1,0.058,1
        </pre>
      </div>
    </motion.div>
  );
}
