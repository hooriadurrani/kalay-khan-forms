
import "./reservation.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  reservationAxiosFunction,
  getReservationsAxiosFunction,
  updateReservationAxiosFunction,
  deleteReservationAxiosFunction,
} from "../services/api";

const schema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 letters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces"),

  guests: z
    .string()
    .min(1, "Number of guests is required")
    .refine((value) => Number(value) >= 1, "At least 1 guest is required")
    .refine((value) => Number(value) <= 20, "Maximum 20 guests allowed"),

  date: z
    .string()
    .min(1, "Please select a date")
    .refine((value) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return value >= `${year}-${month}-${day}`;
    }, "Please select today or a future date"),

  time: z.string().min(1, "Please select a time"),

  tablePreference: z.string().min(1, "Please select a table preference"),
});

function Reservation() {
  const [reservations, setReservations] = useState([]);
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
      guests: "",
      date: "",
      time: "",
      tablePreference: "Indoor Table",
    },
  });

  const loadReservations = async () => {
    try {
      setLoading(true);
      const response = await getReservationsAxiosFunction();
      setReservations(response.data);
    } catch (error) {
      console.error("Error loading reservations:", error);
      alert("Could not load reservations. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const onSubmit = async (data) => {
    try {
      const reservationData = {
        ...data,
        guests: Number(data.guests),
      };

      let response;

      if (editingId) {
        response = await updateReservationAxiosFunction(
          editingId,
          reservationData
        );
      } else {
        response = await reservationAxiosFunction(reservationData);
      }

      alert(response.data.message || "Reservation saved successfully");

      reset({
        customerName: "",
        guests: "",
        date: "",
        time: "",
        tablePreference: "Indoor Table",
      });

      setEditingId(null);
      await loadReservations();
    } catch (error) {
      console.error("Reservation Error:", error);
      alert(
        error.response?.data?.message ||
          "Reservation failed. Please try again."
      );
    }
  };

  const editReservation = (reservation) => {
    const reservationDate = new Date(reservation.date);
    const formattedDate =
      reservationDate.getFullYear() +
      "-" +
      String(reservationDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(reservationDate.getDate()).padStart(2, "0");

    setEditingId(reservation._id);

    reset({
      customerName: reservation.customerName,
      guests: String(reservation.guests),
      date: formattedDate,
      time: reservation.time,
      tablePreference: reservation.tablePreference,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteReservation = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmed) return;

    try {
      const response = await deleteReservationAxiosFunction(id);
      alert(response.data.message || "Reservation deleted successfully");

      if (editingId === id) {
        setEditingId(null);
        reset({
          customerName: "",
          guests: "",
          date: "",
          time: "",
          tablePreference: "Indoor Table",
        });
      }

      await loadReservations();
    } catch (error) {
      console.error("Delete Reservation Error:", error);
      alert(error.response?.data?.message || "Could not delete reservation.");
    }
  };

  return (
    <div className="reservation-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Table Reservation</h2>

      <div className="reservation-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            maxLength={100}
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="reservation-error">{errors.customerName.message}</p>
          )}

          <label>Number of Guests</label>
          <input
            type="number"
            min="1"
            max="20"
            placeholder="Enter number of guests"
            {...register("guests")}
          />
          {errors.guests && (
            <p className="reservation-error">{errors.guests.message}</p>
          )}

          <label>Date</label>
          <input type="date" {...register("date")} />
          {errors.date && (
            <p className="reservation-error">{errors.date.message}</p>
          )}

          <label>Time</label>
          <input type="time" {...register("time")} />
          {errors.time && (
            <p className="reservation-error">{errors.time.message}</p>
          )}

          <label>Table Preference</label>
          <select {...register("tablePreference")}>
            <option value="Indoor Table">Indoor Table</option>
            <option value="Outdoor Table">Outdoor Table</option>
            <option value="Family Table">Family Table</option>
          </select>
          {errors.tablePreference && (
            <p className="reservation-error">
              {errors.tablePreference.message}
            </p>
          )}

          <button type="submit">
            {editingId ? "Update Reservation" : "Book Table"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                reset({
                  customerName: "",
                  guests: "",
                  date: "",
                  time: "",
                  tablePreference: "Indoor Table",
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="reservation-list">
        <h2>All Reservations</h2>

        <button
          className="refresh-reservations"
          type="button"
          onClick={loadReservations}
        >
          Refresh Reservations
        </button>

        {loading && <p>Loading reservations...</p>}

        {!loading && reservations.length === 0 && (
          <p>No reservations found.</p>
        )}

        {!loading && reservations.length > 0 && (
          <div className="reservations-table-container">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Guests</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Table Preference</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.customerName}</td>
                    <td>{reservation.guests}</td>
                    <td>
                      {new Date(reservation.date).toLocaleDateString()}
                    </td>
                    <td>{reservation.time}</td>
                    <td>{reservation.tablePreference}</td>
                    <td className="reservation-actions">
                      <button
                        type="button"
                        onClick={() => editReservation(reservation)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteReservation(reservation._id)}
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

export default Reservation;
