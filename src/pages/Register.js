// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      // Agar register success hai
      alert("🎉 Registration Successful! Please check your email.");

      // Form reset
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("⚠️ Registration failed! Try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
