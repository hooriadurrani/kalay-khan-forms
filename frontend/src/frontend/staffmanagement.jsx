import "./staffmanagement.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addStaffAxiosFunction,
  getStaffAxiosFunction,
  updateStaffAxiosFunction,
  deleteStaffAxiosFunction,
} from "../services/api";

// Form validation
const schema = z.object({
  staffName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[A-Za-z ]+$/, "Use letters and spaces only"),

  phone: z
    .string()
    .trim()
    .regex(/^03\d{9}$/, "Enter a valid Pakistani mobile number"),

  email: z.string().trim().email("Enter a valid email address"),

  position: z.enum(["Chef", "Waiter", "Cashier", "Manager"]),

  salary: z
    .string()
    .min(1, "Salary is required")
    .refine(
      (value) => Number.isFinite(Number(value)),
      "Enter a valid salary"
    )
    .refine(
      (value) => Number(value) > 0,
      "Salary must be greater than 0"
    )
    .refine(
      (value) => Number(value) <= 10000000,
      "Salary cannot exceed 10,000,000"
    ),

  duty: z.enum(["Morning", "Evening", "Night"]),

  joiningDate: z
    .string()
    .min(1, "Joining date is required")
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Enter a valid date"
    ),

  status: z.enum(["Active", "Inactive"]),
});

const emptyStaff = {
  staffName: "",
  phone: "",
  email: "",
  position: "Chef",
  salary: "",
  duty: "Morning",
  joiningDate: "",
  status: "Active",
};

function getErrorMessage(error, fallback) {
  console.error(
    "Staff Management API error:",
    error.response?.data || error.message || error
  );

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.response) {
    return `Request failed with status ${error.response.status}. Check the backend.`;
  }

  if (error.request) {
    return "Cannot connect to the backend. Make sure the server is running on port 5000.";
  }

  return error.message || fallback;
}

function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: emptyStaff,
  });

  const showMessage = (text, success = false) => {
    setMessage(text);
    setIsSuccess(success);
  };

  // Load all staff from the backend
  const loadStaff = async () => {
    setIsLoading(true);

    try {
      const response = await getStaffAxiosFunction();

      if (!Array.isArray(response.data)) {
        console.error("Unexpected staff API response:", response.data);
        setStaffList([]);
        showMessage("The backend returned an unexpected staff list.");
        return;
      }

      setStaffList(response.data);
    } catch (error) {
      showMessage(
        getErrorMessage(error, "Could not load staff records.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  // Add or update staff
  const onSubmit = async (data) => {
    setIsSaving(true);
    showMessage("");

    const staffData = {
      staffName: data.staffName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      position: data.position,
      salary: Number(data.salary),
      duty: data.duty,
      joiningDate: data.joiningDate,
      status: data.status,
    };

    try {
      let response;

      if (editingId) {
        response = await updateStaffAxiosFunction(
          editingId,
          staffData
        );
      } else {
        response = await addStaffAxiosFunction(staffData);
      }

      showMessage(
        response.data?.message ||
          (editingId
            ? "Staff updated successfully!"
            : "Staff added successfully!"),
        true
      );

      reset(emptyStaff);
      setEditingId(null);

      // Reload the table after saving
      await loadStaff();
    } catch (error) {
      showMessage(
        getErrorMessage(error, "Could not save staff details.")
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Fill form for editing
  const handleEdit = (staff) => {
    setEditingId(staff._id);
    showMessage("");

    reset({
      staffName: staff.staffName || "",
      phone: staff.phone || "",
      email: staff.email || "",
      position: staff.position || "Chef",
      salary:
        staff.salary !== undefined && staff.salary !== null
          ? String(staff.salary)
          : "",
      duty: staff.duty || "Morning",
      joiningDate: staff.joiningDate
        ? new Date(staff.joiningDate).toISOString().slice(0, 10)
        : "",
      status: staff.status || "Active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete staff
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmed) return;

    showMessage("");

    try {
      const response = await deleteStaffAxiosFunction(id);

      showMessage(
        response.data?.message || "Staff deleted successfully!",
        true
      );

      if (editingId === id) {
        reset(emptyStaff);
        setEditingId(null);
      }

      await loadStaff();
    } catch (error) {
      showMessage(
        getErrorMessage(error, "Could not delete staff member.")
      );
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    reset(emptyStaff);
    setEditingId(null);
    showMessage("");
  };

  return (
    <div className="staff-management-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Staff Management</h2>

      <div className="staff-management-box">
        <h3>{editingId ? "Edit Staff Details" : "Add New Staff"}</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="staffName">Staff Name</label>
          <input
            id="staffName"
            type="text"
            placeholder="Enter full name"
            maxLength={100}
            {...register("staffName")}
          />
          {errors.staffName && (
            <p className="staff-error">{errors.staffName.message}</p>
          )}

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="03XXXXXXXXX"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="staff-error">{errors.phone.message}</p>
          )}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="staff-error">{errors.email.message}</p>
          )}

          <label htmlFor="position">Position</label>
          <select id="position" {...register("position")}>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
            <option value="Cashier">Cashier</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && (
            <p className="staff-error">{errors.position.message}</p>
          )}

          <label htmlFor="salary">Monthly Salary (PKR)</label>
          <input
            id="salary"
            type="number"
            min="0.01"
            max="10000000"
            step="any"
            placeholder="Enter monthly salary"
            {...register("salary")}
          />
          {errors.salary && (
            <p className="staff-error">{errors.salary.message}</p>
          )}

          <label htmlFor="duty">Duty / Shift</label>
          <select id="duty" {...register("duty")}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
          {errors.duty && (
            <p className="staff-error">{errors.duty.message}</p>
          )}

          <label htmlFor="joiningDate">Joining Date</label>
          <input
            id="joiningDate"
            type="date"
            {...register("joiningDate")}
          />
          {errors.joiningDate && (
            <p className="staff-error">{errors.joiningDate.message}</p>
          )}

          <label htmlFor="status">Employment Status</label>
          <select id="status" {...register("status")}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="staff-error">{errors.status.message}</p>
          )}

          <button type="submit" disabled={isSaving}>
            {isSaving
              ? "Saving..."
              : editingId
                ? "Update Staff"
                : "Add Staff"}
          </button>

          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}

          {message && (
            <p
              role="status"
              style={{
                color: isSuccess ? "green" : "red",
                overflowWrap: "anywhere",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      <div className="staff-management-box staff-list-box">
        <h3>Staff List</h3>

        {isLoading ? (
          <p>Loading staff records...</p>
        ) : staffList.length === 0 ? (
          <p>No staff records found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Salary (PKR)</th>
                  <th>Shift</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff._id}>
                    <td>{staff.staffName}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.email}</td>
                    <td>{staff.position}</td>
                    <td>{Number(staff.salary).toLocaleString()}</td>
                    <td>{staff.duty}</td>
                    <td>
                      {staff.joiningDate
                        ? new Date(staff.joiningDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{staff.status}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleEdit(staff)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(staff._id)}
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

export default StaffManagement;