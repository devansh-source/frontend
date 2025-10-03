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
      try {
        const productRes = await axios.get(
          "https://backend-bguf.onrender.com/api/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(productRes.data);

        const salesRes = await axios.get(
          "https://backend-bguf.onrender.com/api/sales",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const validSales = (salesRes.data || []).filter(s => s.product);
        setSales(validSales);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };
    fetchData();
  }, [token]);

  // --- CALCULATIONS ---
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);
  const lowStockCount = products.filter((p) => p.quantity > 0 && p.quantity < 5).length;
  const totalItemsSold = sales.reduce((acc, s) => acc + s.quantity, 0);
  
  const soldProductIds = new Set(sales.map(s => s.product._id));
  const unsoldProductsCount = products.filter(p => !soldProductIds.has(p._id)).length;
  
  // NEW: Count products with zero quantity
  const outOfStockCount = products.filter(p => p.quantity === 0).length;

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
          <h3>Total Sales Orders</h3>
          <p>{sales.length}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>Rs.{totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Total Items Sold</h3>
          <p>{totalItemsSold}</p>
        </div>
        <div className="card">
          <h3>Low Stock Items</h3>
          <p>{lowStockCount}</p>
        </div>
        <div className="card">
            <h3>Out of Stock</h3>
            <p>{outOfStockCount}</p>
        </div>
        <div className="card">
          <h3>Unsold Products</h3>
          <p>{unsoldProductsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;