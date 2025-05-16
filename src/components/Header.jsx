import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="navbar__container">
        <Link to="/" className="logo">
          <img
            src={`${import.meta.env.BASE_URL}images/global/Logo.png`}
            alt="Product Owner in Test Logo"
          />
        </Link>

        <Link to="/" id="navbar__logo">
          Product Owner in Test™
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/qa-to-pot"
          className={({ isActive }) => `nav__link ${isActive ? "active" : ""}`}
          end
        >
          QA to POT
        </NavLink>

        <NavLink
          to="/why"
          className={({ isActive }) => `nav__link ${isActive ? "active" : ""}`}
        >
          Why
        </NavLink>

        <NavLink
          to="/pot"
          className={({ isActive }) => `nav__link ${isActive ? "active" : ""}`}
        >
          POT
        </NavLink>

        <button className="nav-button" onClick={() => navigate('/login')}>
          Sign In
        </button>

        <button className="nav-button" onClick={() => navigate('/register')}>
          Register
        </button>
      </nav>
    </header>
  );
};

export default Header;
