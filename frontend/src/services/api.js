import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000
});

// Healthcheck
export const getHealth = () => api.get("/health");

// Latest metrics for dashboard charts
export const getLatestMetrics = (params = {}) =>
  api.get("/data/latest", { params });

// Predict failure risk for single reading
export const postPredict = (payload) => api.post("/predictions", payload);

// Get predictions for all machines
export const getPredictions = () => api.get("/predictions/all");

// Upload CSV (historical)
export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/data/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// --- NEW: Simulation endpoint ---
export const runSimulation = ({ machineId, hours }) =>
  api.post("/simulation/run", { machineId, hours });
