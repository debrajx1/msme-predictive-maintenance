import axios from "axios";

export async function predictFromWindowOrFeatures({ vibration_window, temp_c }) {
  try {
    const res = await axios.post(`${process.env.MODEL_SERVER_URL}/predict`, { vibration_window, temp_c }, { timeout: 8000 });
    return res.data;
  } catch {
    throw new Error("ML server unavailable");
  }
}
