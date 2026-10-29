
import mongoose from "mongoose";

const inventoryMonitoringSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
      max: 100000,
    },

    itemStatus: {
      type: String,
      required: true,
      enum: ["Available", "Low Stock", "Missing"],
    },

    missingItems: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const InventoryMonitoring = mongoose.model(
  "InventoryMonitoring",
  inventoryMonitoringSchema
);

export default InventoryMonitoring;
