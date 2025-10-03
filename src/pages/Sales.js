import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import "../styles.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const fetchSales = async () => {
    try {
      const { data } = await API.get("/api/sales");
      setSales(data);
    } catch {
      toast.error("Failed to fetch sales");
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/api/products");
      setProducts(data);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const addSale = async () => {
    try {
      await API.post("/api/sales", { productId, quantity });
      toast.success("Sale recorded successfully!");
      fetchSales();
      setProductId(""); setQuantity("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add sale");
    }
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.quantity * sale.product.price, 0);

  return (
    <div className="container">
      <div className="card">
        <h2>Sales</h2>
        <table className="table-container">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.product.name}</td>
                <td>{sale.quantity}</td>
                <td>₹{sale.product.price}</td>
                <td>₹{sale.quantity * sale.product.price}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><b>Total Revenue:</b> ₹{totalRevenue.toLocaleString()}</p>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={addSale}>Add Sale</button>
        <button onClick={() => navigate("/")}>Go to Products</button>
      </div>
    </div>
  );
};

export default Sales;
