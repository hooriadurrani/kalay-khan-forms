import "./customerregister.css";

function CustomerRegister() {
  return (
    <div className="register-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Customer Registration</h2>

      <div className="register-box">
        <form>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button type="submit">Register</button>

        </form>
      </div>

    </div>
  );
}

export default CustomerRegister;