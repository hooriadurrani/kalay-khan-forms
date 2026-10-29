
import "./menumanagement.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getMenuAxiosFunction,
  addMenuAxiosFunction,
  updateMenuAxiosFunction,
  deleteMenuAxiosFunction,
} from "../services/api";

const schema = z.object({
  foodName: z
    .string()
    .trim()
    .min(2, "Food name must contain at least 2 characters")
    .max(100, "Food name cannot exceed 100 characters"),

  category: z
    .string()
    .min(1, "Please select a category")
    .refine(
      (value) =>
        ["Main Course", "BBQ", "Rice", "Special"].includes(value),
      "Please select a valid category"
    ),

  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (value) => Number.isFinite(Number(value)),
      "Enter a valid price"
    )
    .refine(
      (value) => Number(value) > 0,
      "Price must be greater than 0"
    )
    .refine(
      (value) => Number(value) <= 1000000,
      "Price cannot exceed 1,000,000"
    ),

  availability: z
    .string()
    .min(1, "Please select availability")
    .refine(
      (value) => ["Available", "Out of Stock"].includes(value),
      "Please select a valid availability"
    ),
});

const emptyForm = {
  foodName: "",
  category: "Main Course",
  price: "",
  availability: "Available",
};

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: emptyForm,
  });

  const loadMenuItems = async () => {
    setIsLoading(true);

    try {
      const response = await getMenuAxiosFunction();
      setMenuItems(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to load menu items. Check that the backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const openAddForm = () => {
    reset(emptyForm);
    setEditingId(null);
    setMessage("");
    setErrorMessage("");
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    setMessage("");
    setErrorMessage("");
    setIsSaving(true);

    const menuData = {
      name: data.foodName.trim(),
      category: data.category,
      price: Number(data.price),
      available: data.availability === "Available",
    };

    try {
      if (editingId) {
        const response = await updateMenuAxiosFunction(
          editingId,
          menuData
        );
        setMessage(
          response.data.message || "Menu item updated successfully."
        );
      } else {
        const response = await addMenuAxiosFunction(menuData);
        setMessage(
          response.data.message || "Menu item added successfully."
        );
      }

      reset(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadMenuItems();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to save menu item."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setMessage("");
    setErrorMessage("");

    setValue("foodName", item.name);
    setValue("category", item.category);
    setValue("price", String(item.price));
    setValue(
      "availability",
      item.available ? "Available" : "Out of Stock"
    );

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    try {
      const response = await deleteMenuAxiosFunction(id);

      if (editingId === id) {
        reset(emptyForm);
        setEditingId(null);
        setShowForm(false);
      }

      setMessage(
        response.data.message || "Menu item deleted successfully."
      );

      await loadMenuItems();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to delete menu item."
      );
    }
  };

  const cancelForm = () => {
    reset(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setMessage("");
    setErrorMessage("");
  };

  return (
    <div className="menu-management-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <div className="menu-heading">
        <h2>Menu Management</h2>

        <button type="button" onClick={openAddForm}>
          + Add Menu Item
        </button>
      </div>

      {message && (
        <p role="status" style={{ color: "green" }}>
          {message}
        </p>
      )}

      {errorMessage && (
        <p role="alert" style={{ color: "#dc3545" }}>
          {errorMessage}
        </p>
      )}

      {showForm && (
        <div
          className="menu-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              cancelForm();
            }
          }}
        >
          <div
            className="menu-management-box menu-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-form-title"
          >
            <h2 id="menu-form-title">
              {editingId ? "Edit Menu Item" : "Add Menu Item"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label>Food Name</label>
              <input
                type="text"
                placeholder="Enter food name"
                maxLength={100}
                {...register("foodName")}
              />
              {errors.foodName && (
                <p style={{ color: "#dc3545" }}>
                  {errors.foodName.message}
                </p>
              )}

              <label>Category</label>
              <select {...register("category")}>
                <option value="Main Course">Main Course</option>
                <option value="BBQ">BBQ</option>
                <option value="Rice">Rice</option>
                <option value="Special">Special</option>
              </select>
              {errors.category && (
                <p style={{ color: "#dc3545" }}>
                  {errors.category.message}
                </p>
              )}

              <label>Price (PKR)</label>
              <input
                type="number"
                min="0.01"
                max="1000000"
                step="0.01"
                placeholder="Enter price in PKR"
                {...register("price")}
              />
              {errors.price && (
                <p style={{ color: "#dc3545" }}>
                  {errors.price.message}
                </p>
              )}

              <label>Availability</label>
              <select {...register("availability")}>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              {errors.availability && (
                <p style={{ color: "#dc3545" }}>
                  {errors.availability.message}
                </p>
              )}

              <div className="menu-form-actions">
                <button type="submit" disabled={isSaving}>
                  {isSaving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Add Menu Item"}
                </button>

                <button
                  type="button"
                  onClick={cancelForm}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2>Existing Menu Items</h2>

      {isLoading ? (
        <p>Loading menu items...</p>
      ) : menuItems.length === 0 ? (
        <p>No menu items found. Click Add Menu Item to begin.</p>
      ) : (
        <div className="menu-table-container">
          <table className="menu-items-table">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Category</th>
                <th>Price (PKR)</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {menuItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>Rs. {item.price}</td>
                  <td>
                    {item.available ? "Available" : "Out of Stock"}
                  </td>
                  <td>
                    <div className="menu-action-buttons">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MenuManagement;
