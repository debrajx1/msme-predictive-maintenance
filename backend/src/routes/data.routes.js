import { Router } from "express";
import multer from "multer";
import { uploadDataset, getLatestMetrics, listDatasets, deleteDataset } from "../controllers/data.controller.js";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadDataset);
router.get("/latest", getLatestMetrics);
router.get("/datasets", listDatasets);
router.delete("/datasets/:id", deleteDataset);

export default router;
