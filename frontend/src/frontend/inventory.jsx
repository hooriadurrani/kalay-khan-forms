
import "./inventory.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getInventoryMonitoringAxiosFunction,
  addInventoryMonitoringAxiosFunction,
  updateInventoryMonitoringAxiosFunction,
  deleteInventoryMonitoringAxiosFunction,
} from "../services/api.jsx";

const schema = z.object({
  itemName: z
    .string()
    .trim()
    .min(2, "Item name must contain at least 2 characters")
    .max(100, "Item name cannot exceed 100 characters"),

  currentQuantity: z
    .string()
    .min(1, "Current quantity is required")
    .refine(
      (value) => Number.isFinite(Number(value)),
      "Enter a valid quantity"
    )
    .refine(
      (value) => Number(value) >= 0 && Number(value) <= 100000,
      "Quantity must be between 0 and 100000"
    ),

  unit: z.string().min(1, "Please select a unit"),

  updateQuantity: z
    .string()
    .min(1, "Update quantity is required")
    .refine(
      (value) => Number.isFinite(Number(value)),
      "Enter a valid quantity"
    )
    .refine(
      (value) => Number(value) >= 0 && Number(value) <= 100000,
      "Quantity must be between 0 and 100000"
    ),
});

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      itemName: "",
      currentQuantity: "",
      unit: "Kg",
      updateQuantity: "",
    },
  });

  // View inventory records
  const loadInventory = async () => {
    try {
      const response =
        await getInventoryMonitoringAxiosFunction();

      setInventory(response.data);
    } catch (error) {
      setMessage("Could not load inventory records.");
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // Add or update inventory
  const onSubmit = async (data) => {
    const quantity = Number(data.updateQuantity);

    const inventoryData = {
      itemName: data.itemName.trim(),
      availableQuantity: quantity,
      itemStatus:
        quantity === 0
          ? "Missing"
          : quantity <= 5
          ? "Low Stock"
          : "Available",
      missingItems:
        quantity === 0
          ? data.itemName.trim()
          : "None",
    };

    try {
      if (editingId) {
        await updateInventoryMonitoringAxiosFunction(
          editingId,
          inventoryData
        );
        setMessage("Inventory updated successfully!");
      } else {
        await addInventoryMonitoringAxiosFunction(
          inventoryData
        );
        setMessage("Inventory added successfully!");
      }

      reset({
        itemName: "",
        currentQuantity: "",
        unit: "Kg",
        updateQuantity: "",
      });

      setEditingId(null);
      await loadInventory();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not save inventory."
      );
    }
  };

  // Load selected item into form
  const editInventory = (item) => {
    setEditingId(item._id);

    setValue("itemName", item.itemName);
    setValue(
      "currentQuantity",
      String(item.availableQuantity)
    );
    setValue(
      "updateQuantity",
      String(item.availableQuantity)
    );

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete inventory item
  const deleteInventory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await deleteInventoryMonitoringAxiosFunction(id);
      setMessage("Inventory deleted successfully!");

      if (editingId === id) {
        reset();
        setEditingId(null);
      }

      await loadInventory();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not delete inventory."
      );
    }
  };

  const cancelUpdate = () => {
    reset({
      itemName: "",
      currentQuantity: "",
      unit: "Kg",
      updateQuantity: "",
    });

    setEditingId(null);
    setMessage("");
  };

  return (
    <div className="inventory-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Staff Inventory Update</h2>

      <div className="inventory-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            maxLength={100}
            {...register("itemName")}
          />
          {errors.itemName && (
            <p className="inventory-error">
              {errors.itemName.message}
            </p>
          )}

          <label>Current Quantity</label>
          <input
            type="number"
            min="0"
            max="100000"
            step="any"
            placeholder="Current quantity"
            {...register("currentQuantity")}
          />
          {errors.currentQuantity && (
            <p className="inventory-error">
              {errors.currentQuantity.message}
            </p>
          )}

          <label>Unit</label>
          <select {...register("unit")}>
            <option value="Kg">Kg</option>
            <option value="Liters">Liters</option>
            <option value="Pieces">Pieces</option>
          </select>

          <label>Update Quantity</label>
          <input
            type="number"
            min="0"
            max="100000"
            step="any"
            placeholder="Enter new quantity"
            {...register("updateQuantity")}
          />
          {errors.updateQuantity && (
            <p className="inventory-error">
              {errors.updateQuantity.message}
            </p>
          )}

          <button type="submit">
            {editingId ? "Save Update" : "Add Inventory"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-inventory-button"
              onClick={cancelUpdate}
            >
              Cancel Update
            </button>
          )}
        </form>

        {message && <p>{message}</p>}
      </div>

      <h2>Available Inventory</h2>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Available Quantity</th>
              <th>Status</th>
              <th>Missing Items</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="5">No inventory records found.</td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.availableQuantity}</td>
                  <td>{item.itemStatus}</td>
                  <td>{item.missingItems}</td>
                  <td>
                    <button
                      type="button"
                      className="edit-inventory-button"
                      onClick={() => editInventory(item)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-inventory-button"
                      onClick={() => deleteInventory(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
