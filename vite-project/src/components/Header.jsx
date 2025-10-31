import React from 'react';
// Import NavLink (and Link for the logo) from react-router-dom
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      {/* Use Link component for the logo to navigate home */}
      <div className="logo"><Link to="/">OM perfumery</Link></div>
      <nav className="main-nav">
        <ul>
          {/* Use NavLink for navigation links */}
          {/* The className prop takes a function. It receives { isActive } */}
          {/* If isActive is true, we return 'active', otherwise an empty string */}
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          <li><NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>FAQ</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;