import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("https://backend-bguf.onrender.com/api/users/login", { email, password }); 
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)} // ✅ setEmail
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
