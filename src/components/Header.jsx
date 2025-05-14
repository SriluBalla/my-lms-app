import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="navbar__container">
        <a href="/" className="logo">
          <img src="./images/global/Logo.png" alt="Product Owner in Test Logo" />
        </a>
        <a href="/" id="navbar__logo">Product Owner in Test™</a>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
          end
        >
          QA to POT
        </NavLink>

        <NavLink
          to="/why"
          className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
        >
          Why
        </NavLink>

        <NavLink
          to="/pot"
          className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
        >
          POT
        </NavLink>

        <button className="nav-button">Log In</button>
        <button className="nav-button">Sign In</button>
      </nav>
    </header>
  );
};

export default Header;

