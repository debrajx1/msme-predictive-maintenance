import { Router } from "express";
import { postPredict, listPredictions } from "../controllers/prediction.controller.js";

const router = Router();

// Predict single machine risk from current readings
router.post("/predictions", postPredict);

// Get predictions for all machines (latest telemetry)
router.get("/predictions/all", listPredictions);

export default router;
