import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Product";   // ✅ fixed import
import Sales from "./pages/Sales";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isAuthenticated ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/sales"
          element={isAuthenticated ? <Sales /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
};

export default App;
