import { useState, useRef } from "react";
import { FaFileCsv, FaUpload } from "react-icons/fa";

export default function FileUpload({ onFile }) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFile = (file) => {
    setSelectedFile(file);
    onFile?.(file);
  };

  return (
    <div
      className={`rounded-2xl bg-slate-800/50 backdrop-blur-md p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all 
        ${dragOver ? "border-2 border-blue-400 shadow-lg" : "border border-slate-700"}`}
      onClick={() => fileInputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <FaFileCsv className="text-5xl text-blue-400" />

      {!selectedFile ? (
        <div className="text-sm text-slate-300 text-center">
          Drop CSV here or click to browse
        </div>
      ) : (
        <div className="text-sm text-slate-200 text-center">
          Selected: {selectedFile.name}
        </div>
      )}

      <input
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />

      <FaUpload className="text-blue-400 animate-bounce mt-2" />
    </div>
  );
}
