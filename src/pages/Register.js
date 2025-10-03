import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify"; // Import toast
import "./styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); // Initialize the navigate function

  const API_URL = process.env.REACT_APP_API_URL || "https://backend-bguf.onrender.com";

  const handleRegister = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill all fields"); // Use toast for error
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/users/register`, {
        username,
        email,
        password,
      });

      // Show success popup message
      toast.success(data.message);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      // Show error popup message
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