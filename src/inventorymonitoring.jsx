import "./inventorymonitoring.css";
function InventoryMonitoring() {
  return (
    <div className="monitoring-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Inventory & Kitchen Monitoring</h2>

      <div className="monitoring-box">
        <form>

          <h3>Inventory Check</h3>

          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
          />

          <label>Available Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
          />

          <label>Item Status</label>
          <select>
            <option>Available</option>
            <option>Low Stock</option>
            <option>Missing</option>
          </select>

          <label>Order Missing Items</label>
          <input
            type="text"
            placeholder="Enter items needed"
          />

          <button type="submit">Place Supply Order</button>

          <h3>Kitchen Live Footage</h3>

          <div className="camera-box">
            Live Kitchen Camera
          </div>

        </form>
      </div>

    </div>
  );
}

export default InventoryMonitoring;