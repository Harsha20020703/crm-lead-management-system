import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Login button clicked");

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>CRM Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          margin: "10px",
          padding: "10px",
          width: "250px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          margin: "10px",
          padding: "10px",
          width: "250px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;