import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch products safely
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("https://backend-bguf.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, []);

  // Fetch sales safely
  const fetchSales = useCallback(async () => {
    try {
      const res = await axios.get("https://backend-bguf.onrender.com/api/sales", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // filter out any sales that don’t have product populated
      const validSales = (res.data || []).filter(s => s.product !== null);
      setSales(validSales);
    } catch (err) {
      console.error("Error fetching sales:", err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, [fetchProducts, fetchSales]);

  // Add new sale
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !quantity) return;

    try {
      await axios.post(
        "https://backend-bguf.onrender.com/api/sales",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setProductId("");
      setQuantity("");
      fetchSales();
    } catch (err) {
      console.error("Error adding sale:", err);
    }
  };

  return (
    <div className="container">
      <h2>Sales Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Add Sale</button>
      </form>

      <ul>
        {sales.length === 0 ? (
          <li>No sales recorded yet.</li>
        ) : (
          sales.map((s) => (
            <li key={s._id}>
              {s.product?.name || "Unknown Product"} - Quantity: {s.quantity}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Sales;
