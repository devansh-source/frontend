// src/pages/Register.js
import React, { useState } from "react";
import API from "../api"; // Use the centralized API file
import { toast } from 'react-toastify'; // Import toast

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return toast.error("Please fill in all fields.");
    }
    try {
      const { data } = await API.post("/api/users/register", { username, email, password });
      toast.success(data.message); // Success popup
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed"); // Error popup
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;