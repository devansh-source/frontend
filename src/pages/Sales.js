import React, { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from 'react-toastify';
import API from "../api";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for the form
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSalesAndProducts = useCallback(async () => {
    try {
      setLoading(true);
      const [salesRes, productsRes] = await Promise.all([
        API.get("/api/sales"),
        API.get("/api/products")
      ]);
      setSales((salesRes.data || []).filter(s => s.product));
      setProducts(productsRes.data || []);
    } catch (err) {
      toast.error("Failed to fetch data.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSalesAndProducts();
  }, [fetchSalesAndProducts]);

  const handleSubmitSale = async (e) => {
    e.preventDefault();
    const selectedProduct = products.find(p => p._id === productId);
    
    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }
    if (quantity <= 0 || quantity > selectedProduct.quantity) {
      toast.error(`Invalid quantity. Available stock: ${selectedProduct.quantity}`);
      return;
    }

    try {
      await API.post("/api/sales", { productId, quantity: Number(quantity) });
      toast.success("Sale recorded successfully!");
      setProductId("");
      setQuantity("");
      fetchSalesAndProducts(); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add sale.");
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (window.confirm("Are you sure? This will restore the product stock.")) {
      try {
        await API.delete(`/api/sales/${saleId}`);
        toast.success("Sale deleted and stock restored!");
        fetchSalesAndProducts();
      } catch (error) {
        toast.error("Failed to delete sale.");
      }
    }
  };

  const filteredSales = useMemo(() =>
    sales.filter(s =>
      s.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [sales, searchTerm]
  );
  
  const selectedProductStock = products.find(p => p._id === productId)?.quantity || 0;

  return (
    <div>
      <h1 className="page-header">Sales Management</h1>

      {}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSubmitSale} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
          <select value={productId} onChange={e => setProductId(e.target.value)}>
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id} disabled={p.quantity === 0}>
                {p.name} ({p.quantity > 0 ? `${p.quantity} in stock` : 'Out of stock'})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max={selectedProductStock}
            disabled={!productId || selectedProductStock === 0}
          />
          <button type="submit" disabled={!productId || selectedProductStock === 0}>Add Sale</button>
        </form>
      </div>

      {}
      <div className="card">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: '1rem', maxWidth: '400px' }}
        />
        {loading ? <p>Loading sales...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table className="products-table"> {}
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((s) => (
                  <tr key={s._id}>
                    <td>{s.product.name}</td>
                    <td>{s.quantity}</td>
                    <td>₹{s.totalPrice.toFixed(2)}</td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleDeleteSale(s._id)} style={{ backgroundColor: '#ef4444' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sales;