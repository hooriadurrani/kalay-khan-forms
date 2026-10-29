
import InventoryMonitoring from "../models/inventoryMonitoring.js";

// Get all inventory records
export const getInventory = async (req, res) => {
  try {
    const inventory = await InventoryMonitoring.find().sort({
      createdAt: -1,
    });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      message: "Could not load inventory records",
    });
  }
};

// Add new inventory record
export const addInventory = async (req, res) => {
  try {
    const inventory = await InventoryMonitoring.create(req.body);

    res.status(201).json({
      message: "Inventory added successfully!",
      inventory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update inventory record
export const updateInventory = async (req, res) => {
  try {
    const inventory = await InventoryMonitoring.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory record not found",
      });
    }

    res.status(200).json({
      message: "Inventory updated successfully!",
      inventory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete inventory record
export const deleteInventory = async (req, res) => {
  try {
    const inventory = await InventoryMonitoring.findByIdAndDelete(
      req.params.id
    );

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory record not found",
      });
    }

    res.status(200).json({
      message: "Inventory deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
