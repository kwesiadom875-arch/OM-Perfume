// src/Header.jsx
import React from 'react';
import { useCart } from './CartContext.jsx'; // CRITICAL: Reads cart state
import { Link } from 'react-router-dom'; // CRITICAL: Used for cart link

function Header({ notification }) {
  // CRASH POINT: This line requires the component to be wrapped in CartProvider
  const { cartCount } = useCart(); 

  return (
    <header className="header">
      {/* Notification Box */}
      <div 
        className={`cart-notification ${notification.visible ? 'visible' : ''}`}
      >
        {notification.message}
      </div>

      {/* Top Bar with Social Links */}
      <div className="top-bar">
        <span className="welcome-text">Welcome to your luxury scent experience!</span>
        <div className="social-icons">
          <a href="https://facebook.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">F</a> 
          <a href="https://twitter.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">T</a>
          <a href="https://pinterest.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">P</a>
          <a href="https://youtube.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">Y</a>
        </div>
      </div>

      {/* Main Logo and Primary Navigation */}
      <div className="main-nav-bar">
        <div className="logo-container">
          <h1 className="logo-text">O.M.</h1>
        </div>
        
        <nav className="primary-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scents">Scents</Link></li>
            <li><Link to="/discovery">Discovery</Link></li>
            <li><Link to="/story">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="utility-icons">
          <button title="Search">🔍</button>
          <button title="Account">👤</button>
          {/* LINK TO CART PAGE */}
          <Link to="/cart" className="cart-button" title="Shopping Cart"> 
            🛒 ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;