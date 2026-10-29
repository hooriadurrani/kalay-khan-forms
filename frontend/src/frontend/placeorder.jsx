
import "./placeorder.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    orderAxiosFunction,
    getOrdersAxiosFunction,
    updateOrderAxiosFunction,
    deleteOrderAxiosFunction
} from "../services/api";

// Validation rules
const schema = z.object({
    customerName: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 letters")
        .max(100, "Name cannot exceed 100 characters")
        .regex(
            /^[A-Za-z ]+$/,
            "Name can contain only letters and spaces"
        ),

    food: z.string().min(1, "Please select food"),

    quantity: z
        .string()
        .min(1, "Quantity is required")
        .refine(
            (value) => Number(value) >= 1,
            "Quantity must be at least 1"
        )
        .refine(
            (value) => Number(value) <= 50,
            "Maximum quantity is 50"
        ),

    instructions: z.string(),
});

function PlaceOrder() {
    const [orders, setOrders] = useState([]);
    const [editId, setEditId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            customerName: "",
            food: "Biryani - Rs. 350",
            quantity: "",
            instructions: "",
        },
    });

    // View all orders
    const loadOrders = async () => {
        try {
            const response = await getOrdersAxiosFunction();
            setOrders(response.data);
        } catch (error) {
            console.error("Fetch Orders Error:", error);
            alert("Could not load orders.");
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // Add or update order
    const onSubmit = async (data) => {
        try {
            const orderData = {
                ...data,
                quantity: Number(data.quantity),
            };

            let response;

            if (editId) {
                response = await updateOrderAxiosFunction(
                    editId,
                    orderData
                );
            } else {
                response = await orderAxiosFunction(orderData);
            }

            alert(response.data.message);

            reset({
                customerName: "",
                food: "Biryani - Rs. 350",
                quantity: "",
                instructions: "",
            });

            setEditId(null);
            await loadOrders();
        } catch (error) {
            console.error("Order Error:", error);
            alert(
                error.response?.data?.message ||
                "Order operation failed. Please try again."
            );
        }
    };

    // Edit order
    const editOrder = (order) => {
        setEditId(order._id);

        reset({
            customerName: order.customerName,
            food: order.food,
            quantity: String(order.quantity),
            instructions: order.instructions || "",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete order
    const deleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }

        try {
            const response = await deleteOrderAxiosFunction(id);
            alert(response.data.message);

            if (editId === id) {
                setEditId(null);
                reset({
                    customerName: "",
                    food: "Biryani - Rs. 350",
                    quantity: "",
                    instructions: "",
                });
            }

            await loadOrders();
        } catch (error) {
            console.error("Delete Order Error:", error);
            alert(
                error.response?.data?.message ||
                "Could not delete order."
            );
        }
    };

    const onInvalid = () => {};

    return (
        <div className="order-page">
            <div className="restaurant-header">
                <h1>KALAY KHAN</h1>
                <p>Serving With Love</p>
            </div>

            <h2>{editId ? "Edit Order" : "Place Your Order"}</h2>

            <div className="order-box">
                <form
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    noValidate
                >
                    <label>Customer Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        maxLength={100}
                        {...register("customerName")}
                    />
                    {errors.customerName && (
                        <p style={{ color: "red" }}>
                            {errors.customerName.message}
                        </p>
                    )}

                    <label>Select Food</label>
                    <select {...register("food")}>
                        <option value="Biryani - Rs. 350">
                            Biryani - Rs. 350
                        </option>
                        <option value="Karahi - Rs. 1200">
                            Karahi - Rs. 1200
                        </option>
                        <option value="Handi - Rs. 1000">
                            Handi - Rs. 1000
                        </option>
                        <option value="Seekh Kabab - Rs. 500">
                            Seekh Kabab - Rs. 500
                        </option>
                        <option value="Tikkay - Rs. 600">
                            Tikkay - Rs. 600
                        </option>
                        <option value="Special Platter - Rs. 1500">
                            Special Platter - Rs. 1500
                        </option>
                    </select>
                    {errors.food && (
                        <p style={{ color: "red" }}>
                            {errors.food.message}
                        </p>
                    )}

                    <label>Quantity</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        placeholder="Enter quantity"
                        {...register("quantity")}
                    />
                    {errors.quantity && (
                        <p style={{ color: "red" }}>
                            {errors.quantity.message}
                        </p>
                    )}

                    <label>Special Instructions</label>
                    <textarea
                        placeholder="Any special instructions"
                        {...register("instructions")}
                    />

                    <button type="submit">
                        {editId ? "Update Order" : "Place Order"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditId(null);
                                reset({
                                    customerName: "",
                                    food: "Biryani - Rs. 350",
                                    quantity: "",
                                    instructions: "",
                                });
                            }}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>

            <h2>Saved Orders</h2>

            <div className="orders-table-container">
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Food</th>
                                <th>Quantity</th>
                                <th>Instructions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.customerName}</td>
                                    <td>{order.food}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.instructions || "-"}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => editOrder(order)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => deleteOrder(order._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default PlaceOrder;
