
import "./adminlogin.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginAxiosFunction } from "../services/api";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .email("Enter a valid email address"),

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
});

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onSubmit = async (data) => {
    setLoginError("");
    setIsLoading(true);

    try {
      const response = await adminLoginAxiosFunction({
        email: data.email,
        password: data.password,
      });

      alert(response.data.message);
      navigate("/admin-dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        setLoginError("Invalid email or password.");
      } else {
        setLoginError(
          error.response?.data?.message ||
            "Unable to log in. Please check that the backend is running."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Admin Login</h2>

      <div className="login-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "#dc3545" }}>
              {errors.email.message}
            </p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            maxLength={20}
            {...passwordField}
            onChange={(event) => {
              passwordField.onChange(event);
              setPassword(event.target.value);
            }}
          />

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

          {loginError && (
            <p role="alert" style={{ color: "#dc3545" }}>
              {loginError}
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
