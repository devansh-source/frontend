import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://backend-bguf.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const addProduct = async () => {
    try {
      await axios.post("https://backend-bguf.onrender.com/api/products", { name, quantity, price }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName("");
      setQuantity(0);
      setPrice(0);
      fetchProducts(); // Refetch products after adding a new one
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://backend-bguf.onrender.com/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="form">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} | Price: {p.price} | Status:{" "}
            {p.quantity > 0 ? (
              `In Stock (${p.quantity})`
            ) : (
              <span className="low-stock">Out of Stock</span>
            )}
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;