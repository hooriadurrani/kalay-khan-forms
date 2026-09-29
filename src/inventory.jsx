import "./inventory.css";

function Inventory() {
  return (
    <div className="inventory-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Inventory Management</h2>

      <div className="inventory-box">
        <form>

          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
          />

          <label>Current Quantity</label>
          <input
            type="number"
            placeholder="Enter current quantity"
          />

          <label>Unit</label>
          <select>
            <option>Kg</option>
            <option>Liters</option>
            <option>Pieces</option>
          </select>

          <label>Update Quantity</label>
          <input
            type="number"
            placeholder="Enter new quantity"
          />

          <button type="submit">Update Inventory</button>

        </form>
      </div>

    </div>
  );
}

export default Inventory;