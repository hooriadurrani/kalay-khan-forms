
import "./customerregister.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerRegisterAxiosFunction } from "../services/api";

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .email("Enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^03[0-9]{9}$/, "Enter a valid Pakistani phone number"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(/[A-Z]/, "At least one uppercase letter is required")
    .regex(/[a-z]/, "At least one lowercase letter is required")
    .regex(/[0-9]/, "At least one number is required")
    .regex(
      /[^A-Za-z0-9]/,
      "At least one special character is required"
    ),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function CustomerRegister() {
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await customerRegisterAxiosFunction(data);
      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const onInvalid = () => {
    setShowPasswordErrors(true);
  };

  return (
    <div className="register-page">

      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Customer Registration</h2>

      <div className="register-box">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone")}
          />
          {errors.phone && <p>{errors.phone.message}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            {...register("password")}
            onChange={() => setShowPasswordErrors(false)}
          />
          {showPasswordErrors && errors.password && (
            <p>{errors.password.message}</p>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p>{errors.confirmPassword.message}</p>
          )}

          <button type="submit">Register</button>

        </form>
      </div>

    </div>
  );
}

export default CustomerRegister;
