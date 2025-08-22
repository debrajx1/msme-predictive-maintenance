import { createContext, useContext, useState } from "react";
import Papa from "papaparse";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [csvUploaded, setCsvUploaded] = useState([]); // parsed CSV rows
  const [predictions, setPredictions] = useState([]);
  const [machines, setMachines] = useState([]);

  /**
   * Handles CSV upload
   * Accepts variations in headers like: Machine ID, Machine_ID, machineId
   */
  const handleCsvUpload = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data
          .map((row) => {
            const normalizedRow = {};
            Object.keys(row).forEach((key) => {
              const val = row[key]?.trim();
              const normalizedKey = key.trim().toLowerCase();
              if (normalizedKey.includes("machine")) normalizedRow.Machine_ID = val;
              else if (normalizedKey.includes("temp")) normalizedRow.Temperature = parseFloat(val);
              else if (normalizedKey.includes("vib")) normalizedRow.Vibration = parseFloat(val);
              else if (normalizedKey.includes("usage")) normalizedRow.Usage_Hours = parseFloat(val);
            });
            return normalizedRow;
          })
          .filter((r) => r.Machine_ID);

        setCsvUploaded(parsedData);

        // Extract unique machine IDs
        const machineList = [...new Set(parsedData.map((r) => r.Machine_ID))].map((id) => ({ id }));
        setMachines(machineList);

        console.log("CSV parsed:", parsedData);
        console.log("Machines:", machineList);
      },
      error: (err) => console.error("CSV parse error:", err),
    });
  };

  return (
    <AppContext.Provider
      value={{
        csvUploaded,
        setCsvUploaded,
        predictions,
        setPredictions,
        machines,
        setMachines,
        handleCsvUpload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = () => useContext(AppContext);
