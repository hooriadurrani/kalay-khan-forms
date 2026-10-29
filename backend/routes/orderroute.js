
import express from "express";

import {
    addOrder,
    getOrders,
    updateOrder,
    deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", addOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
