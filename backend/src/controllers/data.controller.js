import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Dataset from "../models/Dataset.js";
import Telemetry from "../models/Telemetry.js";

/**
 * Upload CSV dataset and store telemetry entries
 */
export const uploadDataset = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== ".csv") return res.status(400).json({ message: "Only CSV files are allowed" });

    const rows = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          // Convert fields to numbers and handle missing values
          rows.push({
            ts: row.ts ? new Date(row.ts) : new Date(),
            machine_id: row.machine_id || row.Machine_ID || row.machine || "machineA",
            temp: Number(row.temp ?? row.Temperature ?? 0),
            vib: Number(row.vib ?? row.Vibration ?? 0),
            usage: Number(row.usage ?? row.Usage_Hours ?? 0),
            current_a: row.current_a ? Number(row.current_a) : undefined,
            rpm: row.rpm ? Number(row.rpm) : undefined,
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    if (rows.length) await Telemetry.insertMany(rows, { ordered: false });

    const dataset = await Dataset.create({
      name: req.file.originalname,
      path: filePath,
      rows: rows.length,
    });

    res.status(201).json({ message: "Dataset uploaded successfully", dataset, inserted: rows.length });
  } catch (err) {
    next(err);
  }
};

/**
 * Get latest metrics for a specific machine (for dashboard charts)
 */
export const getLatestMetrics = async (req, res, next) => {
  try {
    const { machineId = "machineA", limit = 60 } = req.query;
    const docs = await Telemetry.find({ machine_id: machineId })
      .sort({ ts: -1 })
      .limit(Number(limit));

    const metrics = docs.reverse().map(d => ({
      ts: d.ts,
      temp: d.temp,
      vib: d.vib,
      usage: d.usage,
    }));

    res.json({ machineId, metrics });
  } catch (err) {
    next(err);
  }
};

/**
 * List all uploaded datasets
 */
export const listDatasets = async (req, res, next) => {
  try {
    const datasets = await Dataset.find().sort({ uploadedAt: -1 });
    res.json(datasets);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a dataset and its uploaded file
 */
export const deleteDataset = async (req, res, next) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) return res.status(404).json({ message: "Dataset not found" });

    if (dataset.path && fs.existsSync(dataset.path)) {
      fs.unlinkSync(path.resolve(dataset.path));
    }

    await dataset.deleteOne();
    res.json({ message: "Dataset deleted successfully" });
  } catch (err) {
    next(err);
  }
};
