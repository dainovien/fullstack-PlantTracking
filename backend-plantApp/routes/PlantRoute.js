import express from "express";
import {
  getPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
} from "../controllers/PlantController.js";

const router = express.Router();

router.get("/plants", getPlants);
router.get("/plants/:id", getPlantById);
router.post("/plants", createPlant);
router.patch("/plants/:id", updatePlant);
router.delete("/plants/:id", deletePlant);

export default router;
