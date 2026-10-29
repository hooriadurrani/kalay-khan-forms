
import express from "express";

import customerRegisterController from "../controllers/customerRegisterController.js";
import customerLoginController from "../controllers/customerLoginController.js";

const router = express.Router();

router.post("/register", customerRegisterController);
router.post("/login", customerLoginController);

export default router;
