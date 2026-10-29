
import express from "express";

import {
    addReservation,
    getReservations,
    updateReservation,
    deleteReservation
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", addReservation);
router.get("/", getReservations);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
