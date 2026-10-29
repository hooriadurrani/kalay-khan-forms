
import "./inventorymonitoring.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addInventoryMonitoringAxiosFunction,
  getInventoryMonitoringAxiosFunction,
  updateInventoryMonitoringAxiosFunction,
  deleteInventoryMonitoringAxiosFunction,
} from "../services/api";

const schema = z.object({
  itemName: z
    .string()
    .trim()
    .min(2, "Item name must contain at least 2 characters")
    .max(100, "Item name cannot exceed 100 characters"),

  availableQuantity: z
    .string()
    .min(1, "Available quantity is required")
    .refine(
      (value) => Number.isFinite(Number(value)),
      "Enter a valid quantity"
    )
    .refine(
      (value) => Number(value) >= 0,
      "Quantity cannot be negative"
    )
    .refine(
      (value) => Number(value) <= 100000,
      "Quantity cannot exceed 100000"
    ),

  itemStatus: z
    .string()
    .min(1, "Please select item status")
    .refine(
      (value) =>
        ["Available", "Low Stock", "Missing"].includes(value),
      "Please select a valid item status"
    ),

  missingItems: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters")
    .max(200, "Items needed cannot exceed 200 characters"),
});

function InventoryMonitoring() {
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      itemName: "",
      availableQuantity: "",
      itemStatus: "Available",
      missingItems: "",
    },
  });

  // View all inventory records
  const loadInventory = async () => {
    setLoading(true);

    try {
      const response =
        await getInventoryMonitoringAxiosFunction();

      setInventory(response.data);
    } catch (error) {
      console.error("Inventory loading error:", error);
      setMessage(
        error.response?.data?.message ||
          "Could not load inventory records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // Add or update inventory
  const onSubmit = async (data) => {
    setSaving(true);
    setMessage("");

    try {
      const inventoryData = {
        ...data,
        availableQuantity: Number(data.availableQuantity),
      };

      let response;

      if (editingId) {
        response = await updateInventoryMonitoringAxiosFunction(
          editingId,
          inventoryData
        );
      } else {
        response = await addInventoryMonitoringAxiosFunction(
          inventoryData
        );
      }

      setMessage(
        response.data?.message ||
          (editingId
            ? "Inventory updated successfully!"
            : "Inventory saved successfully!")
      );

      reset();
      setEditingId(null);

      await loadInventory();
    } catch (error) {
      console.error("Inventory save error:", error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Could not save inventory."
      );
    } finally {
      setSaving(false);
    }
  };

  // Select a record for editing
  const handleEdit = (item) => {
    setEditingId(item._id);
    setMessage("");

    reset({
      itemName: item.itemName,
      availableQuantity: String(item.availableQuantity),
      itemStatus: item.itemStatus,
      missingItems: item.missingItems,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    reset();
    setMessage("");
  };

  // Delete an inventory record
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory record?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");

    try {
      const response =
        await deleteInventoryMonitoringAxiosFunction(id);

      setMessage(
        response.data?.message ||
          "Inventory deleted successfully!"
      );

      if (editingId === id) {
        setEditingId(null);
        reset();
      }

      await loadInventory();
    } catch (error) {
      console.error("Inventory delete error:", error);

      setMessage(
        error.response?.data?.message ||
          "Could not delete inventory record."
      );
    }
  };

  return (
    <div className="monitoring-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Inventory & Kitchen Monitoring</h2>

      <div className="monitoring-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3>Inventory Check</h3>

          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            maxLength={100}
            {...register("itemName")}
          />
          {errors.itemName && (
            <p style={{ color: "#dc3545" }}>
              {errors.itemName.message}
            </p>
          )}

          <label>Available Quantity</label>
          <input
            type="number"
            min="0"
            max="100000"
            step="any"
            placeholder="Enter quantity"
            {...register("availableQuantity")}
          />
          {errors.availableQuantity && (
            <p style={{ color: "#dc3545" }}>
              {errors.availableQuantity.message}
            </p>
          )}

          <label>Item Status</label>
          <select {...register("itemStatus")}>
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Missing">Missing</option>
          </select>
          {errors.itemStatus && (
            <p style={{ color: "#dc3545" }}>
              {errors.itemStatus.message}
            </p>
          )}

          <label>Order Missing Items</label>
          <input
            type="text"
            placeholder="Enter items needed"
            maxLength={200}
            {...register("missingItems")}
          />
          {errors.missingItems && (
            <p style={{ color: "#dc3545" }}>
              {errors.missingItems.message}
            </p>
          )}

          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
                ? "Update Inventory"
                : "Place Supply Order"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel Edit
            </button>
          )}

          {message && (
            <p
              role="status"
              aria-live="polite"
              style={{
                color:
                  message.toLowerCase().includes("could not") ||
                  message.toLowerCase().includes("error")
                    ? "#dc3545"
                    : "#198754",
                overflowWrap: "anywhere",
              }}
            >
              {message}
            </p>
          )}

          <h3>Kitchen Live Footage</h3>

          <div className="camera-box">
            Live Kitchen Camera
          </div>
        </form>

        {/* View Inventory Records */}
        <h3>Inventory Records</h3>

        {loading ? (
          <p>Loading inventory...</p>
        ) : inventory.length === 0 ? (
          <p>No inventory records found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "15px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "10px" }}>Item Name</th>
                  <th style={{ padding: "10px" }}>Quantity</th>
                  <th style={{ padding: "10px" }}>Status</th>
                  <th style={{ padding: "10px" }}>Items Needed</th>
                  <th style={{ padding: "10px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id}>
                    <td style={{ padding: "10px" }}>
                      {item.itemName}
                    </td>

                    <td style={{ padding: "10px" }}>
                      {item.availableQuantity}
                    </td>

                    <td style={{ padding: "10px" }}>
                      {item.itemStatus}
                    </td>

                    <td style={{ padding: "10px" }}>
                      {item.missingItems}
                    </td>

                    <td style={{ padding: "10px" }}>
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        style={{ marginLeft: "5px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryMonitoring;
