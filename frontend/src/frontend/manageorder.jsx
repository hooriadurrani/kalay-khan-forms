
import "./manageorder.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  orderAxiosFunction,
  getOrdersAxiosFunction,
  updateOrderAxiosFunction,
  deleteOrderAxiosFunction,
} from "../services/api";

const schema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 letters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces"),

  food: z
    .string()
    .trim()
    .min(2, "Food item must contain at least 2 characters")
    .max(100, "Food item cannot exceed 100 characters"),

  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine(
      (value) => Number.isInteger(Number(value)),
      "Quantity must be a whole number"
    )
    .refine(
      (value) => Number(value) >= 1 && Number(value) <= 50,
      "Quantity must be between 1 and 50"
    ),

  instructions: z.string().max(500, "Instructions cannot exceed 500 characters"),

  orderStatus: z.enum(
    ["Pending", "Preparing", "Ready", "Completed"],
    { message: "Please select a valid order status" }
  ),
});

function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

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
      food: "",
      quantity: "1",
      instructions: "",
      orderStatus: "Pending",
    },
  });

  // VIEW: Load orders from MongoDB
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrdersAxiosFunction();
      setOrders(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ADD and UPDATE
  const onSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        quantity: Number(data.quantity),
      };

      if (editingId) {
        await updateOrderAxiosFunction(editingId, orderData);
        alert("Order updated successfully!");
      } else {
        await orderAxiosFunction(orderData);
        alert("Order added successfully!");
      }

      reset({
        customerName: "",
        food: "",
        quantity: "1",
        instructions: "",
        orderStatus: "Pending",
      });

      setEditingId(null);
      await loadOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving order");
    }
  };

  // Select an order to UPDATE
  const editOrder = (order) => {
    setEditingId(order._id);

    reset({
      customerName: order.customerName || "",
      food: order.food || "",
      quantity: String(order.quantity ?? 1),
      instructions: order.instructions || "",
      orderStatus: order.orderStatus || "Pending",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE an order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await deleteOrderAxiosFunction(id);

      if (editingId === id) {
        reset({
          customerName: "",
          food: "",
          quantity: "1",
          instructions: "",
          orderStatus: "Pending",
        });
        setEditingId(null);
      }

      alert("Order deleted successfully!");
      await loadOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting order");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    reset({
      customerName: "",
      food: "",
      quantity: "1",
      instructions: "",
      orderStatus: "Pending",
    });
    setEditingId(null);
  };

  return (
    <div className="manage-order-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Manage Orders</h2>

      <div className="manage-order-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter customer name"
            maxLength={100}
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="order-error">{errors.customerName.message}</p>
          )}

          <label>Food Item</label>
          <input
            type="text"
            placeholder="Enter food item"
            maxLength={100}
            {...register("food")}
          />
          {errors.food && (
            <p className="order-error">{errors.food.message}</p>
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
            <p className="order-error">{errors.quantity.message}</p>
          )}

          <label>Instructions</label>
          <input
            type="text"
            placeholder="Optional instructions"
            maxLength={500}
            {...register("instructions")}
          />
          {errors.instructions && (
            <p className="order-error">{errors.instructions.message}</p>
          )}

          <label>Order Status</label>
          <select {...register("orderStatus")}>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.orderStatus && (
            <p className="order-error">{errors.orderStatus.message}</p>
          )}

          <button type="submit">
            {editingId ? "Update Order" : "Add Order"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-order-button"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <h2>Saved Orders</h2>

      <div className="orders-table-container">
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Food</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>{order.food}</td>
                  <td>{order.quantity}</td>
                  <td>{order.orderStatus || "Pending"}</td>
                  <td>
                    <button
                      type="button"
                      className="edit-order-button"
                      onClick={() => editOrder(order)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-order-button"
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

export default ManageOrder;
