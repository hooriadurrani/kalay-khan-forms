
import express from "express";
import cors from "cors";
import "./connection.js";

import customerRoutes from "./routes/customerRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import orderRoutes from "./routes/orderroute.js";
import adminRoutes from "./routes/adminRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import inventoryMonitoringRoutes from "./routes/inventoryMonitoringRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/inventory-monitoring", inventoryMonitoringRoutes);

app.get("/", (req, res) => {
  res.send("Kalay Khan Backend Running");
});

app.get("/test", (req, res) => {
  res.json({
    message: "Frontend connected successfully!",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
