
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tablePreference: {
        type: String,
        required: true
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
