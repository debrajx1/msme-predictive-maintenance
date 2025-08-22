import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  rows: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Dataset", datasetSchema);
