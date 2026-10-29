
import Reservation from "../models/reservation.js";

// Add reservation
export const addReservation = async (req, res) => {
    try {
        const {
            customerName,
            guests,
            date,
            time,
            tablePreference
        } = req.body;

        const newReservation = new Reservation({
            customerName,
            guests,
            date,
            time,
            tablePreference
        });

        await newReservation.save();

        res.status(201).json({
            message: "Table reserved successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error saving reservation"
        });
    }
};

// View all reservations
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching reservations"
        });
    }
};

// Update reservation
export const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.status(200).json({
            message: "Reservation updated successfully",
            data: updatedReservation
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating reservation"
        });
    }
};

// Delete reservation
export const deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(
            req.params.id
        );

        if (!deletedReservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.status(200).json({
            message: "Reservation deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting reservation"
        });
    }
};
