import "./menumanagement.css";
function MenuManagement() {
  return (
    <div className="menu-management-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Menu Management</h2>

      <div className="menu-management-box">
        <form>

          <label>Food Name</label>
          <input
            type="text"
            placeholder="Enter food name"
          />

          <label>Category</label>
          <select>
            <option>Main Course</option>
            <option>BBQ</option>
            <option>Rice</option>
            <option>Special</option>
          </select>

          <label>Price</label>
          <input
            type="number"
            placeholder="Enter price"
          />

          <label>Availability</label>
          <select>
            <option>Available</option>
            <option>Out of Stock</option>
          </select>
          <button type="submit">Update Menu</button>
        </form>
      </div>
    </div>
  );
}

export default MenuManagement;