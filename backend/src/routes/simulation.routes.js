import { Router } from "express";
import { runSimulation } from "../controllers/simulation.controller.js";

const router = Router();

// Run simulation for a machine
// Supports multi-point simulation via `points` in body
router.post("/simulation/run", runSimulation);

export default router;
