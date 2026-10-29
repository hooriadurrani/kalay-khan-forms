
import Menu from "../models/menu.js";

// Get all menu items
export const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching menu items"
        });
    }
};

// Add a menu item
export const addMenuItem = async (req, res) => {
    try {
        const newItem = await Menu.create(req.body);

        res.status(201).json({
            message: "Menu item added successfully",
            menuItem: newItem
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding menu item"
        });
    }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item updated successfully",
            menuItem: updatedItem
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating menu item"
        });
    }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndDelete(
            req.params.id
        );

        if (!deletedItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting menu item"
        });
    }
};
