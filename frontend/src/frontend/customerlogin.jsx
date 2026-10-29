
import "./customerlogin.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerLoginAxiosFunction } from "../services/api";

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

function CustomerLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

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

  const passwordField = register("password");

  const rules = [
    {
      text: "Minimum 8 characters",
      valid: password.length >= 8,
    },
    {
      text: "Maximum 20 characters",
      valid: password.length <= 20,
    },
    {
      text: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      text: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      text: "At least one number (0-9)",
      valid: /[0-9]/.test(password),
    },
    {
      text: "At least one special character (@, #, !)",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const score = rules.filter((rule) => rule.valid).length;

  let strength = "Weak";
  let strengthColor = "red";

  if (score === rules.length) {
    strength = "Strong";
    strengthColor = "green";
  } else if (score >= 3) {
    strength = "Medium";
    strengthColor = "orange";
  }

  const onSubmit = async (data) => {
    try {
      const response = await customerLoginAxiosFunction(data);

      alert(response.data.message);
      navigate("/customer-dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  const onInvalid = () => {
    setShowPasswordErrors(true);
  };

  return (
    <div className="login-page">
      <div className="restaurant-header">
        <h1>KALAY KHAN</h1>
        <p>Serving With Love</p>
      </div>

      <h2>Customer Login</h2>

      <div className="login-box">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />

          {errors.email && (
            <p style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...passwordField}
            onChange={(event) => {
              passwordField.onChange(event);
              setPassword(event.target.value);
              setShowPasswordErrors(false);
            }}
          />

          {password.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <p style={{ color: strengthColor, fontWeight: "bold" }}>
                Password Strength: {strength}
              </p>

              {rules.map((rule) => (
                <p
                  key={rule.text}
                  style={{
                    color: rule.valid ? "green" : "red",
                    fontSize: "12px",
                    margin: "4px 0",
                  }}
                >
                  {rule.valid ? "✓" : "✗"} {rule.text}
                </p>
              ))}
            </div>
          )}

          {showPasswordErrors && errors.password && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.password.message}
            </p>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
