
import express from "express";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryMonitoringController.js";

const router = express.Router();

// Get all inventory records
router.get("/", getInventory);

// Add a new inventory record
router.post("/", addInventory);

// Update an inventory record
router.put("/:id", updateInventory);

// Delete an inventory record
router.delete("/:id", deleteInventory);

export default router;
