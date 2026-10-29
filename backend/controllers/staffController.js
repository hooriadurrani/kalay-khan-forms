
import Staff from "../models/staff.js";

// Get all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve staff",
    });
  }
};

// Add new staff
export const addStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);

    res.status(201).json({
      message: "Staff added successfully",
      staff,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to add staff",
    });
  }
};

// Update staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
      });
    }

    res.status(200).json({
      message: "Staff updated successfully",
      staff,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update staff",
    });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
      });
    }

    res.status(200).json({
      message: "Staff deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to delete staff",
    });
  }
};
