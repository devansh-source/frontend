import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductForm = ({ isOpen, onRequestClose, onSave, product }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setQuantity(product.quantity);
      setPrice(product.price);
    } else {
      setName('');
      setQuantity('');
      setPrice('');
    }
  }, [product, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || quantity < 0 || price < 0) {
      alert('Please fill all fields with valid values.');
      return;
    }
    onSave({ name, quantity: Number(quantity), price: Number(price) });
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '2rem',
      backgroundColor: 'var(--surface-color)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel="Product Form"
    >
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="0"
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
        />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={onRequestClose} style={{ flex: 1, backgroundColor: 'var(--text-secondary)'}}>
            Cancel
          </button>
          <button type="submit" style={{ flex: 1 }}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;