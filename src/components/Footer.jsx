import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">

        <div className='footer-menu'>
             <Link to="about.html" className="footer_link">About</Link>
              <Link to="contact.html" className="footer_link">Contact</Link>
            <Link to="privacy.html" className="footer_link">Privacy</Link>
        </div>

      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} Product Owner in Test™. All rights reserved.</p>
        {/* Add more footer links or menus here as needed */}
      </div>
    </footer>
  );
};

export default Footer;
