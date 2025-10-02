import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import API from "../api"; // Import the central API instance
import { toast } from "react-toastify"; // Import toast for notifications
import "./styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = async () => {
    // 1. Add basic validation
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // 2. Use the central API instance
      const { data } = await API.post("/api/users/register", {
        username,
        email,
        password,
      });

      // 3. Use toast for notifications, not alert()
      toast.success(data.message);

      // 4. Use navigate for redirection
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;