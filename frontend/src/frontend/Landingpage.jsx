import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./style.css";

function LandingPage() {
  const [message, setMessage] = useState("");

  // Connect frontend with backend
  useEffect(() => {
    api
      .get("/test")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log("Backend connection error:", error);
        setMessage("Backend is not connected.");
      });
  }, []);

  return (
    <div>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Kalay Khan
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#menu">
                  Menu
                </a>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/reservation">
                  Reservation
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>

            <Link
              to="/customer-register"
              className="btn btn-dark me-2"
            >
              Register
            </Link>

            <Link to="/customer-login" className="btn btn-dark">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="hero text-center py-5">
        <div className="container">
          <h1>Welcome to Kalay Khan Restaurant</h1>

          <p>
            Enjoy delicious food and traditional flavors
            with your family and friends.
          </p>

          <a href="#menu" className="btn btn-warning">
            Explore Our Menu
          </a>
        </div>
      </section>

      {/* ================= CAROUSEL ================= */}

      <div
        id="home"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/f4.enc"
              className="d-block w-100"
              alt="Kalay Khan Restaurant"
            />

            <div className="carousel-caption">
              <h2>Kalay Khan Restaurant</h2>
              <p>Delicious food, unforgettable moments</p>

              <Link to="/place-order" className="btn btn-warning">
                Order Now
              </Link>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/f3.enc"
              className="d-block w-100"
              alt="Fresh Food"
            />

            <div className="carousel-caption">
              <h2>Fresh & Delicious</h2>
              <p>Enjoy the taste you love</p>

              <Link to="/reservation" className="btn btn-warning">
                Reserve Now
              </Link>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/f5.enc"
              className="d-block w-100"
              alt="Restaurant"
            />

            <div className="carousel-caption">
              <h2>Great Food, Great Memories</h2>
              <p>Enjoy your meal with your loved ones</p>

              <Link to="/reservation" className="btn btn-warning">
                Book a Table
              </Link>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#home"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#home"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ================= ABOUT ================= */}

      <section id="about" className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="/f2.jpg"
              className="img-fluid rounded"
              alt="About Kalay Khan"
            />
          </div>

          <div className="col-md-6">
            <h2>About Kalay Khan Restaurant</h2>

            <p>
              Welcome to Kalay Khan Restaurant.
              We serve delicious food prepared
              with fresh ingredients and
              traditional flavors.
            </p>

            <button className="btn btn-dark">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================= MENU ================= */}

      <section id="menu" className="container py-5">
        <h2 className="text-center mb-5">Our Menu</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Chicken Biryani</h5>
                <p>Delicious chicken biryani with traditional spices.</p>
                <h6>Rs. 350</h6>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Chicken Karahi</h5>
                <p>Traditional chicken karahi with fresh ingredients.</p>
                <h6>Rs. 1200</h6>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Chicken Handi</h5>
                <p>Creamy chicken handi with delicious spices.</p>
                <h6>Rs. 1000</h6>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Seekh Kabab</h5>
                <p>Grilled seekh kababs with traditional flavors.</p>
                <h6>Rs. 500</h6>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Tikkay</h5>
                <p>Grilled chicken tikka with special spices.</p>
                <h6>Rs. 600</h6>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Special Platter</h5>
                <p>A combination of delicious grilled specialties.</p>
                <h6>Rs. 1500</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESTAURANT FORMS ================= */}

      <section className="container py-5">
        <h2 className="text-center mb-5">Restaurant Forms</h2>

        <div className="row g-4">
          {/* CUSTOMER */}

          <div className="col-md-4">
            <div className="card p-4">
              <h3 className="text-center mb-4">Customer</h3>

              <Link to="/customer-login" className="btn btn-dark mb-2">
                Customer Login
              </Link>

              <Link to="/customer-register" className="btn btn-dark mb-2">
                Customer Register
              </Link>

              <Link to="/reservation" className="btn btn-dark mb-2">
                Table Reservation
              </Link>

              <Link to="/place-order" className="btn btn-dark">
                Place Order
              </Link>
            </div>
          </div>

          {/* STAFF */}

          <div className="col-md-4">
            <div className="card p-4">
              <h3 className="text-center mb-4">Staff</h3>

              <Link to="/staff-login" className="btn btn-dark mb-2">
                Staff Login
              </Link>

              <Link to="/staff-register" className="btn btn-dark mb-2">
                Staff Registration
              </Link>

              <Link to="/inventory" className="btn btn-dark mb-2">
                Inventory Update
              </Link>

              <Link to="/manage-order" className="btn btn-dark">
                Order Update
              </Link>
            </div>
          </div>

          {/* ADMIN */}

          <div className="col-md-4">
            <div className="card p-4">
              <h3 className="text-center mb-4">Admin</h3>

              <Link to="/admin-login" className="btn btn-dark mb-2">
                Admin Login
              </Link>

              <Link to="/menu-management" className="btn btn-dark mb-2">
                Menu Management
              </Link>

              <Link to="/staff-management" className="btn btn-dark mb-2">
                Staff Management
              </Link>

              <Link
                to="/inventory-monitoring"
                className="btn btn-dark"
              >
                Inventory Monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BACKEND CONNECTION ================= */}

      <div className="container text-center py-3">
        <p>{message}</p>
      </div>

      {/* ================= CONTACT ================= */}

      <section id="contact" className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>

        <p className="text-center">
          We would love to hear from you.
        </p>

        <div className="row">
          <div className="col-md-6">
            <h4>Get in Touch</h4>

            <p>
              <strong>Address:</strong> Abbottabad, Pakistan
            </p>

            <p>
              <strong>Phone:</strong> 0300-1234567
            </p>

            <p>
              <strong>Email:</strong> kalaykhanrestaurant@gmail.com
            </p>
          </div>

          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-warning">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= REGISTER LOGIN ================= */}

      <div className="text-center py-4">
        <Link
          to="/customer-register"
          className="btn btn-dark me-2"
        >
          Register
        </Link>

        <Link to="/customer-login" className="btn btn-dark">
          Login
        </Link>
      </div>

      {/* ================= FOOTER ================= */}

      <footer className="bg-dark text-white text-center py-4">
        <h4>Kalay Khan Restaurant</h4>

        <p>
          Delicious food, great taste,
          and unforgettable moments.
        </p>

        <p>
          © 2026 Kalay Khan Restaurant.
          All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
