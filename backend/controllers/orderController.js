
import Order from "../models/order.js";

// Add order
export const addOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully!",
            order: newOrder
        });
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({
            message: "Error saving order"
        });
    }
};

// View all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders"
        });
    }
};

// Update order
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order updated successfully!",
            order: order
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating order"
        });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting order"
        });
    }
};
