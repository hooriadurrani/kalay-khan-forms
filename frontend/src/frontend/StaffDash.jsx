import { Link } from "react-router-dom";

function StaffDash() {
  return (
    <div>
      <h1>Staff Dashboard</h1>

      <Link to="/inventory">Inventory Update</Link>
      <br /><br />

      <Link to="/manage-order">Order Update</Link>
      <br /><br />

      <Link to="/">Logout</Link>
    </div>
  );
}

export default StaffDash;