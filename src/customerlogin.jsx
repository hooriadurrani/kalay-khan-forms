import "./customerlogin.css";

function CustomerLogin() {
  return (
    <div className="login-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Customer Login</h2>

      <div className="login-box">
        <form>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>

        </form>
      </div>

    </div>
  );
}

export default CustomerLogin;