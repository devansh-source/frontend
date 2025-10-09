import React, { useEffect, useState } from "react";
import API from "../api";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productRes, salesRes] = await Promise.all([
          API.get("/api/products"),
          API.get("/api/sales"),
        ]);

        setProducts(productRes.data);
        const validSales = (salesRes.data || []).filter(s => s.product);
        setSales(validSales);

      } catch (err) {
        setError("Failed to fetch dashboard data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);
  const lowStockCount = products.filter((p) => p.quantity > 0 && p.quantity < 10).length;
  const outOfStockCount = products.filter(p => p.quantity === 0).length;
  const inStockCount = products.length - lowStockCount - outOfStockCount;

  const topSellingProducts = sales
    .reduce((acc, sale) => {
      const productName = sale.product.name;
      const existingProduct = acc.find(p => p.name === productName);
      if (existingProduct) {
        existingProduct.quantity += sale.quantity;
      } else {
        acc.push({ name: productName, quantity: sale.quantity });
      }
      return acc;
    }, [])
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const stockStatusData = [
    { name: "In Stock", value: inStockCount },
    { name: "Low Stock", value: lowStockCount },
    { name: "Out of Stock", value: outOfStockCount },
  ];
  const PIE_COLORS = ["#4f46e5", "#f59e0b", "#ef4444"];

  if (loading) {
    return <div className="page-header">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="page-header" style={{ color: '#ef4444' }}>{error}</div>;
  }

  return (
    <div>
      <h1 className="page-header">Dashboard</h1>

      {}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{products.length}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)' }}>Total Sales Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{sales.length}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)' }}>Low Stock Items</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{lowStockCount}</p>
        </div>
      </div>

      {}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Top 5 Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={ 'var(--border-color)' } />
              <XAxis dataKey="name" stroke={ 'var(--text-secondary)' } />
              <YAxis stroke={ 'var(--text-secondary)' }/>
              <Tooltip cursor={{fill: 'rgba(79, 70, 229, 0.1)'}} contentStyle={{ backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)' }}/>
              <Legend />
              <Bar dataKey="quantity" fill="var(--primary-color)" name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Stock Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stockStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;