
import "./staffregister.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation rules
const schema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 letters")
      .max(100, "Name cannot exceed 100 characters")
      .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .max(100, "Email cannot exceed 100 characters")
      .email("Enter a valid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^03[0-9]{9}$/,
        "Enter a valid Pakistani phone number (03XXXXXXXXX)"
      ),

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function StaffRegister() {
  const [password, setPassword] = useState("");

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

  // Password requirements
  const rules = [
    { text: "At least 8 characters", valid: password.length >= 8 },
    { text: "Maximum 20 characters", valid: password.length <= 20 },
    { text: "Uppercase letter (A-Z)", valid: /[A-Z]/.test(password) },
    { text: "Lowercase letter (a-z)", valid: /[a-z]/.test(password) },
    { text: "At least one number", valid: /[0-9]/.test(password) },
    {
      text: "Special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const score = rules.filter((rule) => rule.valid).length;

  let strength = "Weak";
  let strengthColor = "#dc3545";

  if (score === rules.length) {
    strength = "Strong";
    strengthColor = "#198754";
  } else if (score >= 3) {
    strength = "Medium";
    strengthColor = "#e69500";
  }

  const passwordField = register("password");

  const onSubmit = (data) => {
    alert("Staff registration form validated successfully!");
    console.log("Staff Registration Details:", data);
  };

  return (
    <div className="staff-register-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Staff Registration</h2>

      <div className="staff-register-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter staff name"
            maxLength={100}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p style={{ color: "#dc3545" }}>
              {errors.fullName.message}
            </p>
          )}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "#dc3545" }}>
              {errors.email.message}
            </p>
          )}

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number (03XXXXXXXXX)"
            maxLength={11}
            {...register("phone")}
          />
          {errors.phone && (
            <p style={{ color: "#dc3545" }}>
              {errors.phone.message}
            </p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            maxLength={20}
            {...passwordField}
            onChange={(event) => {
              passwordField.onChange(event);
              setPassword(event.target.value);
            }}
          />

          {/* Password strength */}
          <div style={{ marginTop: "10px", marginBottom: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600" }}>
                Password strength
              </span>

              <span
                style={{
                  color: strengthColor,
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {strength}
              </span>
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  style={{
                    height: "5px",
                    flex: 1,
                    borderRadius: "5px",
                    backgroundColor:
                      item <= score ? strengthColor : "#e5e7eb",
                    transition: "background-color 0.2s",
                  }}
                />
              ))}
            </div>

            <p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginTop: "12px",
                marginBottom: "8px",
              }}
            >
              Password requirements
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "9px 8px",
              }}
            >
              {rules.map((rule, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: rule.valid ? "#198754" : "#6b7280",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {rule.valid ? "✓" : "○"}
                  </span>
                  <span>{rule.text}</span>
                </div>
              ))}
            </div>
          </div>

          {errors.password && (
            <p style={{ color: "#dc3545" }}>
              {errors.password.message}
            </p>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p style={{ color: "#dc3545" }}>
              {errors.confirmPassword.message}
            </p>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default StaffRegister;
