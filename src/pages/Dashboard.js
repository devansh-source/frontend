import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await axios.get("https://backend-bguf.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(productRes.data);

      const salesRes = await axios.get("https://backend-bguf.onrender.com/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSales(salesRes.data);
    };
    fetchData();
  }, [token]);

  // Calculate total revenue
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);

  // Count low stock products
  const lowStockCount = products.filter(p => p.quantity < 5).length;

  return (
    <div className="container">
      <h2>Welcome to Inventory Dashboard</h2>

      <nav className="nav">
        <Link to="/products">Products</Link>
        <Link to="/sales">Sales</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </nav>

      <div className="stats">
        <div className="card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="card">
          <h3>Total Sales</h3>
          <p>{sales.length}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>Rs.{totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Low Stock Items</h3>
          <p>{lowStockCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
