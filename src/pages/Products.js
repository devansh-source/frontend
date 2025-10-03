import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import "../styles.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/api/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    try {
      await API.post("/api/products", { name, price, stock });
      toast.success("Product added successfully!");
      fetchProducts();
      setName(""); setPrice(""); setStock("");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/api/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Products</h2>
        <table className="table-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn-delete" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
        <button onClick={() => navigate("/sales")}>Go to Sales</button>
      </div>
    </div>
  );
};

export default Products;
