import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      setMessage(
        "Invalid email or password"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #eff6ff, #f8fafc)",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "white",
          padding: "45px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "40px",
              color: "#0f172a",
              fontWeight: "700",
            }}
          >
            CRM Login
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "12px",
              fontSize: "15px",
            }}
          >
            Welcome back. Sign in to
            continue to your dashboard.
          </p>
        </div>

        {message && (
          <div
            style={{
              backgroundColor:
                "#ef4444",
              color: "white",
              padding: "14px",
              borderRadius: "12px",
              marginBottom: "25px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={labelStyle}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={labelStyle}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          </div>

          <button
            onClick={handleLogin}
            style={buttonStyle}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  color: "#334155",
  fontWeight: "600",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #dbeafe",
  backgroundColor: "#f8fafc",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "0.2s ease",
  boxShadow:
    "0 4px 12px rgba(37,99,235,0.2)",
};

export default LoginPage;