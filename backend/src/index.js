import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import dataRoutes from "./routes/data.routes.js";
import predictionRoutes from "./routes/prediction.routes.js";
import simulationRoutes from "./routes/simulation.routes.js";
import userRoutes from "./routes/user.routes.js"; // <- added

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/data", dataRoutes);
app.use("/api", predictionRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/users", userRoutes); // <- added

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
