import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";

// Import Layout Components
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <Routes>
        {/* Routes without sidebar/header */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with sidebar/header */}
        <Route 
          path="/" 
          element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} 
        />
        <Route 
          path="/products" 
          element={<PrivateRoute><Layout><Products /></Layout></PrivateRoute>} 
        />
        <Route 
          path="/sales" 
          element={<PrivateRoute><Layout><Sales /></Layout></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;