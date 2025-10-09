import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-header">Inventory</h1>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/sales">Sales</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;