
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

// Customer Registration
export async function customerRegisterAxiosFunction(data) {
    return await api.post("/api/customers/register", data);
}

// Customer Login
export async function customerLoginAxiosFunction(data) {
    return await api.post("/api/customers/login", data);
}

// ================================
// Table Reservation
// ================================

// Add Reservation
export async function reservationAxiosFunction(data) {
    return await api.post("/api/reservations", data);
}

// View All Reservations
export async function getReservationsAxiosFunction() {
    return await api.get("/api/reservations");
}

// Update Reservation
export async function updateReservationAxiosFunction(id, data) {
    return await api.put(`/api/reservations/${id}`, data);
}

// Delete Reservation
export async function deleteReservationAxiosFunction(id) {
    return await api.delete(`/api/reservations/${id}`);
}


 // ================================
// Place Order
// ================================

// Add Order
export async function orderAxiosFunction(data) {
    return await api.post("/api/orders", data);
}

// View All Orders
export async function getOrdersAxiosFunction() {
    return await api.get("/api/orders");
}

// Update Order
export async function updateOrderAxiosFunction(id, data) {
    return await api.put(`/api/orders/${id}`, data);
}

// Delete Order
export async function deleteOrderAxiosFunction(id) {
    return await api.delete(`/api/orders/${id}`);
}


// ================================
// Admin Login
// ================================

export async function adminLoginAxiosFunction(data) {
    return await api.post("/api/admin/login", data);
}

// ================================
// Menu Management
// ================================

// View All Menu Items
export async function getMenuAxiosFunction() {
    return await api.get("/api/menu");
}

// Add Menu Item
export async function addMenuAxiosFunction(data) {
    return await api.post("/api/menu", data);
}

// Update Menu Item
export async function updateMenuAxiosFunction(id, data) {
    return await api.put(`/api/menu/${id}`, data);
}

// Delete Menu Item
export async function deleteMenuAxiosFunction(id) {
    return await api.delete(`/api/menu/${id}`);
}

// ================================
// Staff Management
// ================================

// View All Staff
export async function getStaffAxiosFunction() {
    return await api.get("/api/staff");
}

// Add Staff
export async function addStaffAxiosFunction(data) {
    return await api.post("/api/staff", data);
}

// Update Staff
export async function updateStaffAxiosFunction(id, data) {
    return await api.put(`/api/staff/${id}`, data);
}

// Delete Staff
export async function deleteStaffAxiosFunction(id) {
    return await api.delete(`/api/staff/${id}`);
}

// ================================
// Inventory Monitoring
// ================================

// View All Inventory Records
export async function getInventoryMonitoringAxiosFunction() {
    return await api.get("/api/inventory-monitoring");
}

// Add Inventory Record
export async function addInventoryMonitoringAxiosFunction(data) {
    return await api.post("/api/inventory-monitoring", data);
}

// Update Inventory Record
export async function updateInventoryMonitoringAxiosFunction(id, data) {
    return await api.put(`/api/inventory-monitoring/${id}`, data);
}

// Delete Inventory Record
export async function deleteInventoryMonitoringAxiosFunction(id) {
    return await api.delete(`/api/inventory-monitoring/${id}`);
}

// Export Axios Instance
export default api;
