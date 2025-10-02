import React, { useState } from "react";
import API from "../api"; // CHANGE: Use central API file
import "./styles.css";
import { toast } from "react-toastify"; // CHANGE: Use toast for popups

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // CHANGE: Simplified API call
      const { data } = await API.post("/api/users/login", { username, password });
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      window.location.href = "/"; // Or use navigate('/') from react-router-dom
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;