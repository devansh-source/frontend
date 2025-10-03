// client/src/pages/Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // CHANGE: For redirection
import { toast } from "react-toastify";          // CHANGE: For notifications
import API from "../api";                         // CHANGE: Use central API file
import "./styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // CHANGE: Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault(); // CHANGE: Prevent form submission reload

    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // CHANGE: Use the central API instance
      const { data } = await API.post("/api/users/register", {
        username,
        email,
        password,
      });

      toast.success(data.message);
      navigate("/login"); // CHANGE: Redirect to login page after success

    } catch (err) {
      // CHANGE: Better error handling with toast
      toast.error(err.response?.data?.error || "Registration failed. Please try again.");
      console.error("Registration Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {/* CHANGE: Use a form for better semantics and submission handling */}
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