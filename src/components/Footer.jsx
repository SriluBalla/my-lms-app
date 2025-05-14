import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">

        <div className='footer-menu'>
             <a href="about.html" class="footer_link">About</a>
              <a href="contact.html" class="footer_link">Contact</a>
            <a href="privacy.html" class="footer_link">Privacy</a>
        </div>

      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} Product Owner in Test™. All rights reserved.</p>
        {/* Add more footer links or menus here as needed */}
      </div>
    </footer>
  );
};

export default Footer;
