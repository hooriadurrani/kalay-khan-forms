import "./placeorder.css";

function PlaceOrder() {
  return (
    <div className="order-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Place Your Order</h2>

      <div className="order-box">
        <form>

          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Select Food</label>
          <select>
            <option>Biryani - Rs. 350</option>
            <option>Karahi - Rs. 1200</option>
            <option>Handi - Rs. 1000</option>
            <option>Seekh Kabab - Rs. 500</option>
            <option>Tikkay - Rs. 600</option>
            <option>Special Platter - Rs. 1500</option>
          </select>

          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
          />

          <label>Special Instructions</label>
          <textarea
            placeholder="Any special instructions"
          ></textarea>

          <button type="submit">Place Order</button>

        </form>
      </div>

    </div>
  );
}

export default PlaceOrder;