import React, { useEffect, useState } from "react";
import "../styles/Message.css";

const ConfirmMessage = ({ type, text }) => {
  const [visible, setVisible] = useState(!!text);

  useEffect(() => {
    if (text) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  if (!visible || !text) return null;

  const classMap = {
    success: "msg-success",
    error: "msg-error",
    info: "msg-info",
    warn: "msg-warn",
  };

  return (
    <div className={`msg-wrapper ${classMap[type]}`}>
      <span className="msg-text">{text}</span>
      <button className="close-button" onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
};

export default ConfirmMessage;
