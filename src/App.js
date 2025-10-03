// client/src/pages/Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import "./styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await API.post("/api/users/register", {
        username,
        email,
        password,
      });

      // This will show the "Registration successful!" message
      toast.success(data.message);

      // CHANGE: Wait 2 seconds before redirecting to the login page
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2000 milliseconds = 2 seconds

    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed. Please try again.");
      console.error("Registration Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;