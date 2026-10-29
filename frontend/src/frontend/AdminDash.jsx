import { Link } from "react-router-dom";

function AdminDash() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <Link to="/menu-management">Menu Management</Link>
      <br /><br />

      <Link to="/staff-management">Staff Management</Link>
      <br /><br />

      <Link to="/inventory-monitoring">Inventory Monitoring</Link>
      <br /><br />

      <Link to="/">Logout</Link>
    </div>
  );
}

export default AdminDash;