import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  machine_id: { type: String, required: true },
  temp: { type: Number, default: 0 },
  vib: { type: Number, default: 0 },
  usage: { type: Number, default: 0 },
  current_a: { type: Number },  // optional
  rpm: { type: Number },        // optional
});

export default mongoose.model("Telemetry", telemetrySchema);
