import "./staffregister.css";

function StaffRegister() {
  return (
    <div className="staff-register-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Staff Registration</h2>

      <div className="staff-register-box">
        <form>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter staff name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
          />

          <button type="submit">Register</button>

        </form>
      </div>

    </div>
  );
}

export default StaffRegister;