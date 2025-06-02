import express from "express";
import {
  getPlantLogs,
  getPlantLogById,
  createPlantLog,
  updatePlantLog,
  deletePlantLog,
} from "../controllers/PlantLogController.js";

const router = express.Router();

router.get("/plant-logs", getPlantLogs);
router.get("/plant-logs/:id", getPlantLogById);
router.post("/plant-logs", createPlantLog);
router.patch("/plant-logs/:id", updatePlantLog);
router.delete("/plant-logs/:id", deletePlantLog);

export default router;
