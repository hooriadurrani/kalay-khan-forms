
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    food: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
    instructions: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Preparing", "Ready", "Completed"],
        default: "Pending"
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
