
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    staffName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    position: {
      type: String,
      required: true,
      enum: ["Chef", "Waiter", "Cashier", "Manager"],
    },

    salary: {
      type: Number,
      required: true,
      min: 0.01,
      max: 10000000,
    },

    duty: {
      type: String,
      required: true,
      enum: ["Morning", "Evening", "Night"],
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
