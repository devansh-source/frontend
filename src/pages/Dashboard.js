import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./styles.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await API.get("/api/products");
        setProducts(productRes.data);

        const salesRes = await API.get("/api/sales");
        setSales(salesRes.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard data.");
        console.error("Fetch data error:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You have been logged out.");
    navigate("/login");
  };
  
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);
  const lowStockCount = products.filter(p => p.quantity < 5).length;

  return (
    <div className="container">
      <h2>Welcome to Inventory Dashboard</h2>
      <nav className="nav">
        <Link to="/products">Products</Link>
        <Link to="/sales">Sales</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="stats">
        {/* ... your stat cards ... */}
      </div>
    </div>
  );
};

export default Dashboard;