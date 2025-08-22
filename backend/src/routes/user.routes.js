import { Router } from "express";
import { ping } from "../controllers/user.controller.js";

const router = Router();

// MVP placeholder
router.get("/ping", ping);

export default router;
