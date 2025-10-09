import React, { useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import API from "../api";
import ProductForm from "../components/ProductForm";

// Styles for the table (can be in global.css, but here for simplicity)
const tableStyles = `
  .products-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
  }
  .products-table th, .products-table td {
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    text-align: left;
  }
  .products-table th {
    background-color: var(--sidebar-bg);
  }
  .products-table tr:nth-of-type(even) {
    background-color: var(--bg-color);
  }
  .status-instock { color: #10b981; font-weight: 500; }
  .status-lowstock { color: #f59e0b; font-weight: 500; }
  .status-outofstock { color: #ef4444; font-weight: 500; }
  .action-buttons { display: flex; gap: 10px; }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/api/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (selectedProduct) {
        // Update existing product
        await API.put(`/api/products/${selectedProduct._id}`, productData);
        toast.success("Product updated successfully!");
      } else {
        // Add new product
        await API.post("/api/products", productData);
        toast.success("Product added successfully!");
      }
      handleCloseModal();
      fetchProducts(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save product.");
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/api/products/${id}`);
        toast.success("Product deleted successfully!");
        fetchProducts(); // Refresh the list
      } catch (error) {
        toast.error("Failed to delete product.");
        console.error(error);
      }
    }
  };

  const getStatus = (quantity) => {
    if (quantity === 0) return <span className="status-outofstock">Out of Stock</span>;
    if (quantity < 10) return <span className="status-lowstock">Low Stock ({quantity})</span>;
    return <span className="status-instock">In Stock ({quantity})</span>;
  };

  return (
    <div>
      <style>{tableStyles}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-header">Manage Products</h1>
        <button onClick={() => handleOpenModal()}>Add New Product</button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{getStatus(p.quantity)}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleOpenModal(p)}>Edit</button>
                      <button onClick={() => handleDeleteProduct(p._id)} style={{ backgroundColor: '#ef4444' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProductForm
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;