// components/SuccessPopup.jsx
import React, { useEffect } from "react";
import "../styles/Popup.css"; // Create this CSS file for styling

const SuccessPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // auto-close after 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="success-popup">
      <span>{message}</span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default SuccessPopup;
