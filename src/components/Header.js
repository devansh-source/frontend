import React from 'react';
import { useTheme } from '../context/ThemeContext'; // <-- हमारा कस्टम हुक इम्पोर्ट करें

const Header = () => {
  const { theme, toggleTheme } = useTheme(); // <-- थीम और टॉगल फंक्शन पाएं

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <button onClick={toggleTheme}>
        {/* If theme is light, show moon icon, else show sun icon */}
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;