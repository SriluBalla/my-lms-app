import React from "react";

const ConfirmMessage = ({ type, text }) => {
  if (!text) return null;

  const className = type === "error" ? "error-msg" : "success-msg";

  return (
    <div className={`confirm-message ${className}`}>
      {text}
    </div>
  );
};

export default ConfirmMessage;
