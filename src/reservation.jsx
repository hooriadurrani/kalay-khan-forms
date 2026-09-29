import "./reservation.css";

function Reservation() {
  return (
    <div className="reservation-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Table Reservation</h2>

      <div className="reservation-box">
        <form>

          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Number of Guests</label>
          <input
            type="number"
            placeholder="Enter number of guests"
          />

          <label>Date</label>
          <input type="date" />

          <label>Time</label>
          <input type="time" />

          <label>Table Preference</label>
          <select>
            <option>Indoor Table</option>
            <option>Outdoor Table</option>
            <option>Family Table</option>
          </select>

          <button type="submit">Book Table</button>

        </form>
      </div>

    </div>
  );
}

export default Reservation;