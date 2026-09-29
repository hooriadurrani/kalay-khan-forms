import "./manageorder.css";

function ManageOrder() {
  return (
    <div className="manage-order-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Manage Order Status</h2>

      <div className="manage-order-box">
        <form>

          <label>Order Number</label>
          <input
            type="text"
            placeholder="Enter order number"
          />

          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter customer name"
          />

          <label>Food Item</label>
          <input
            type="text"
            placeholder="Enter food item"
          />

          <label>Order Status</label>
          <select>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Completed</option>
          </select>

          <button type="submit">Update Status</button>

        </form>
      </div>

    </div>
  );
}

export default ManageOrder;