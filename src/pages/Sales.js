import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./styles.css";

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  
  // NEW: State to hold the full object of the selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_URL = "https://backend-bguf.onrender.com";
  const token = localStorage.getItem("token");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [token]);

  const fetchSales = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/sales`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validSales = (res.data || []).filter(s => s.product !== null);
      setSales(validSales);
    } catch (err) {
      console.error("Error fetching sales:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, [fetchProducts, fetchSales]);
  
  // NEW: Handle product selection change
  const handleProductChange = (e) => {
    const currentProductId = e.target.value;
    setProductId(currentProductId);
    
    if (currentProductId) {
      const product = products.find(p => p._id === currentProductId);
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
    setQuantity(""); // Reset quantity on product change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !quantity || quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }
    
    if (quantity > selectedProduct.quantity) {
      alert("Quantity sold cannot be more than the available stock.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/sales`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProductId("");
      setSelectedProduct(null);
      setQuantity("");
      fetchSales(); // Refresh sales list
      fetchProducts(); // Refresh product list to update stock
    } catch (err) {
      console.error("Error adding sale:", err);
      alert(err.response?.data?.error || "Failed to add sale.");
    }
  };

  return (
    <div className="container">
      <h2>Sales Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <select value={productId} onChange={handleProductChange}>
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        
        {/* NEW: Display for stock status */}
        {selectedProduct && (
          <div style={{ width: '100%', padding: '5px 0', fontWeight: '500' }}>
            {selectedProduct.quantity > 0 ? (
              <span>In Stock: {selectedProduct.quantity}</span>
            ) : (
              <span className="low-stock">This product is out of stock.</span>
            )}
          </div>
        )}

        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={selectedProduct ? selectedProduct.quantity : undefined}
          disabled={!selectedProduct || selectedProduct.quantity === 0}
        />
        <button 
          type="submit" 
          disabled={!selectedProduct || selectedProduct.quantity === 0 || !quantity}
        >
          Add Sale
        </button>
      </form>

      <h3>Recent Sales</h3>
      <ul>
        {sales.length === 0 ? (
          <li>No sales recorded yet.</li>
        ) : (
          sales.map((s) => (
            <li key={s._id}>
              {s.product?.name || "Unknown Product"} - Quantity: {s.quantity} - Total: Rs.{s.totalPrice}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Sales;