
import express from "express";
import {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";

const router = express.Router();

// Get all staff
router.get("/", getStaff);

// Add staff
router.post("/", addStaff);

// Update staff by ID
router.put("/:id", updateStaff);

// Delete staff by ID
router.delete("/:id", deleteStaff);

export default router;
