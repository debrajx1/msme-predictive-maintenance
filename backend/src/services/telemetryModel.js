import mongoose from "mongoose";

const TelemetrySchema = new mongoose.Schema({
  ts: { type: Date, required: true, index: true },
  machine_id: { type: String, required: true, index: true },
  vibration_window: { type: [Number], default: undefined },
  vib_rms: { type: Number },
  vib_kurtosis: { type: Number },
  temp_c: { type: Number },
  current_a: { type: Number },
  rpm: { type: Number }
}, { versionKey: false });

TelemetrySchema.index({ machine_id: 1, ts: -1 });

export const Telemetry = mongoose.model("Telemetry", TelemetrySchema);
