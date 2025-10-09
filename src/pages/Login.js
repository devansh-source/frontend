import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/users/login", { username, password });
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h1>Inventory Pro</h1>
        <p>Effortless inventory management for your business.</p>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <input placeholder="Username or Email" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
              </span>
              <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" style={{ width: '100%' }}>Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;