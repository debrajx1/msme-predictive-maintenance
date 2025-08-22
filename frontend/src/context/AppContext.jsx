import { createContext, useContext, useState } from "react";
import Papa from "papaparse"; // CSV parser

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [csvUploaded, setCsvUploaded] = useState([]); // stores parsed CSV rows as JSON
  const [predictions, setPredictions] = useState([]); // stores API prediction results
  const [machines, setMachines] = useState([]); // list of available machines

  /**
   * Handles CSV upload and parsing
   * @param {File} file - CSV file uploaded by user
   */
  const handleCsvUpload = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Convert numeric fields
        const parsedData = results.data.map(row => ({
          Machine_ID: row.Machine_ID,
          Temperature: parseFloat(row.Temperature),
          Vibration: parseFloat(row.Vibration),
          Usage_Hours: parseFloat(row.Usage_Hours)
        }));

        setCsvUploaded(parsedData);

        // Update machines list dynamically
        const machineList = [...new Set(parsedData.map(row => row.Machine_ID))].map(id => ({ id }));
        setMachines(machineList);

        console.log("CSV parsed successfully:", parsedData);
      },
      error: (err) => {
        console.error("Failed to parse CSV:", err);
      }
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
        handleCsvUpload
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy consumption
export const useAppContext = () => useContext(AppContext);
