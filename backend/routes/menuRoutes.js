
import express from "express";
import {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

// Get all menu items
router.get("/", getMenuItems);

// Add a menu item
router.post("/", addMenuItem);

// Update a menu item
router.put("/:id", updateMenuItem);

// Delete a menu item
router.delete("/:id", deleteMenuItem);

export default router;
