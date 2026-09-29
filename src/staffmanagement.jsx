import "./staffmanagement.css";

function StaffManagement() {
  return (
    <div className="staff-management-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Staff Management</h2>

      <div className="staff-management-box">
        <form>

          <label>Staff Name</label>
          <input
            type="text"
            placeholder="Enter staff name"
          />

          <label>Position</label>
          <select>
            <option>Chef</option>
            <option>Waiter</option>
            <option>Cashier</option>
            <option>Manager</option>
          </select>

          <label>Salary</label>
          <input
            type="number"
            placeholder="Enter salary"
          />

          <label>Staff CV</label>
          <input type="file" />

          <label>Loan Amount</label>
          <input
            type="number"
            placeholder="Enter loan amount"
          />

          <label>Duty / Shift</label>
          <select>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </select>

          <button type="submit">Update Staff</button>

        </form>
      </div>

    </div>
  );
}

export default StaffManagement;