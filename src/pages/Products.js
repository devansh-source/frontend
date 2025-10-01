import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("https://backend-bguf.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data);
    };
    fetchProducts();
  }, [token]);

  const addProduct = async () => {
    await axios.post("https://backend-bguf.onrender.com/api/products", { name, quantity, price }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName(""); setQuantity(0); setPrice(0);
    const { data } = await axios.get("https://backend-bguf.onrender.com/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`https://backend-bguf.onrender.com/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} | Qty: {p.quantity} | Price: {p.price}
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
