import React from 'react';
import { useTheme } from '../context/ThemeContext'; // <-- ThemeContext का उपयोग करें

const Header = () => {
  const { theme, toggleTheme } = useTheme(); // <-- थीम और टॉगल फंक्शन प्राप्त करें

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="header">
      {/* Dark mode toggle button */}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? '🌙' : '☀️'} {/* Icon changes with theme */}
      </button>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;