import { Link } from "react-router-dom";

function CustomerDash() {
  return (
    <div>
      <h1>Customer Dashboard</h1>

      <Link to="/reservation">Table Reservation</Link>
      <br /><br />

      <Link to="/place-order">Place Order</Link>
      <br /><br />

      <Link to="/">Logout</Link>
    </div>
  );
}

export default CustomerDash;