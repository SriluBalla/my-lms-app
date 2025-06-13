import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../styles/Perm/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-menu">
        <Link to="/sample-issue-test" className="footer_link">
          Issue Practice
        </Link>
        <Link to="/contact" className="footer_link">
          Check Case Practice
        </Link>
        <Link to="/sample-chapter-check" className="footer_link">
          Chapter Check
        </Link>
      </div>
      <nav>
        <NavLink
          id="issuePractice"
          className="nav__link"
          to="/qa-to-pot"
        ></NavLink>
        <NavLink
          id="checkCasePractice"
          className="nav__link"
          to="/why"
        ></NavLink>
        <NavLink
          id="chapterTest"
          className="nav__link"
          to="/sample-chapter-test"
        ></NavLink>
      </nav>

      <div className="footer__container">
        <p>
          &copy; {new Date().getFullYear()} Product Owner in Test™. All rights
          reserved.
        </p>
        {/* Add more footer links or menus here as needed */}
      </div>
    </footer>
  );
};

export default Footer;
