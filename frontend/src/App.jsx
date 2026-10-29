import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./frontend/Landingpage";

// Customer
import CustomerLogin from "./frontend/customerlogin";
import CustomerRegister from "./frontend/customerregister";
import Reservation from "./frontend/reservation";
import PlaceOrder from "./frontend/placeorder";
import CustomerDash from "./frontend/CustomerDash";

// Staff
import StaffLogin from "./frontend/stafflogin";
import StaffRegister from "./frontend/staffregister";
import Inventory from "./frontend/inventory";
import ManageOrder from "./frontend/manageorder";
import StaffDash from "./frontend/StaffDash";

// Admin
import AdminLogin from "./frontend/adminlogin";
import MenuManagement from "./frontend/menumanagement";
import StaffManagement from "./frontend/staffmanagement";
import InventoryMonitoring from "./frontend/inventorymonitoring";
import AdminDash from "./frontend/AdminDash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  // CUSTOMER
  {
    path: "/customer-login",
    element: <CustomerLogin />,
  },
  {
    path: "/customer-register",
    element: <CustomerRegister />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/place-order",
    element: <PlaceOrder />,
  },
  {
    path: "/customer-dashboard",
    element: <CustomerDash />,
  },

  // STAFF
  {
    path: "/staff-login",
    element: <StaffLogin />,
  },
  {
    path: "/staff-register",
    element: <StaffRegister />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/manage-order",
    element: <ManageOrder />,
  },
  {
    path: "/staff-dashboard",
    element: <StaffDash />,
  },

  // ADMIN
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/menu-management",
    element: <MenuManagement />,
  },
  {
    path: "/staff-management",
    element: <StaffManagement />,
  },
  {
    path: "/inventory-monitoring",
    element: <InventoryMonitoring />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDash />,
  },
]);

export { router };