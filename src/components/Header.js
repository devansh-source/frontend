import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="header">
      {/* Dark mode toggle button */}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? '🌙' : '☀️'} {}
      </button>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;