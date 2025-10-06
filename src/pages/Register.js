import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock API object to simulate a pre-configured Axios instance.
// This resolves the "../api" import error for a self-contained component.
const API = {
  post: async (url, data) => {
    console.log(`Mock API POST to ${url} with data:`, data);
    // Simulate a successful registration
    if (data.email === "test@example.com") {
        // Simulate a user already existing
        return Promise.reject({ 
            response: { 
                data: { 
                    error: "A user with this email already exists." 
                } 
            } 
        });
    }
    // Simulate a successful response
    return Promise.resolve({
      data: {
        message: "Registration successful!",
      },
    });
  },
};

const Register = () => {
    // --- STATE MANAGEMENT ---
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // In a real React Router app, useNavigate would work. We'll mock it for this environment.
    const navigate = (path) => {
        console.log(`Navigating to ${path}`);
        // window.location.href = path; // Uncomment for actual browser navigation
    };

    // --- HANDLERS ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData;

        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await API.post("/api/users/register", {
                username,
                email,
                password,
            });

            setIsSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 2500);

        } catch (err) {
            const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
            setError(errorMessage);
            console.error("Registration Error:", err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- STYLES ---
    // CSS is embedded here to resolve the "./styles.css" import error.
    const styles = `
        :root {
            --primary-color: #5a67d8;
            --success-color: #38a169;
            --error-color: #e53e3e;
            --bg-color: #f7fafc;
            --surface-color: #ffffff;
            --text-primary: #1a202c;
            --text-secondary: #718096;
            --border-color: #e2e8f0;
            --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }
        .container {
            font-family: 'Inter', sans-serif;
            width: 100%;
            max-width: 480px;
            margin: 40px auto;
            background-color: var(--surface-color);
            padding: 40px 50px;
            border-radius: 20px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
        }
        h2 {
            text-align: center;
            margin: 0 0 35px 0;
            color: var(--text-primary);
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -1.5px;
        }
        .form-group {
            position: relative;
            margin-bottom: 25px;
        }
        .form-input {
            width: 100%;
            padding: 22px 16px 8px 16px;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            font-size: 1rem;
            background-color: var(--bg-color);
            color: var(--text-primary);
            transition: all 0.2s ease;
        }
        .form-input::placeholder { color: transparent; }
        .form-label {
            position: absolute;
            top: 15px;
            left: 16px;
            font-size: 1rem;
            color: var(--text-secondary);
            pointer-events: none;
            transition: all 0.2s ease;
        }
        .form-input:focus, .form-input:not(:placeholder-shown) {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.2);
        }
        .form-input:focus + .form-label,
        .form-input:not(:placeholder-shown) + .form-label {
            top: 7px;
            font-size: 0.75rem;
            font-weight: 500;
            color: var(--primary-color);
        }
        button {
            width: 100%;
            padding: 16px 28px;
            background-color: var(--primary-color);
            color: #fff;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        button:hover {
            background-color: #4c51bf;
            transform: translateY(-2px);
        }
        button:disabled {
            background-color: #a0aec0;
            cursor: not-allowed;
        }
        .error-message {
            color: var(--error-color);
            text-align: center;
            margin-bottom: 15px;
        }
        .auth-link {
            text-align: center;
            margin-top: 20px;
            color: var(--text-secondary);
        }
        .auth-link a {
            color: var(--primary-color);
            font-weight: 500;
            text-decoration: none;
        }
        .success-container { text-align: center; }
        .success-icon { width: 80px; height: 80px; margin-bottom: 20px; }
        .success-container h2 { color: var(--success-color); }
    `;

    // --- RENDER LOGIC ---
    if (isSuccess) {
        return (
            <div>
                <style>{styles}</style>
                <div className="container success-container">
                    <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="25" fill="none" stroke="#38a169" strokeWidth="2"/>
                        <path fill="none" stroke="#38a169" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <h2>Registration Successful!</h2>
                    <p>Welcome, {formData.username}! Redirecting you to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <style>{styles}</style>
            <div className="container">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input
                            id="username"
                            name="username"
                            placeholder=" "
                            className="form-input"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder=" "
                            className="form-input"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                         <label htmlFor="email" className="form-label">Email</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder=" "
                            className="form-input"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="auth-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;

