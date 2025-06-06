import React, { useEffect, useState } from "react";
import "../../styles/Message.css";

const Msg_in_Body = ({ type, text, duration = 5000 }) => {
  const [visible, setVisible] = useState(!!text);

  useEffect(() => {
    if (text) {
      setVisible(true);

      // Only auto-hide if duration is a positive number
      if (typeof duration === "number" && duration > 0) {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
      }
    }
  }, [text, duration]);

  if (!visible || !text) return null;

  const classMap = {
    success: "msg-success",
    error: "msg-error",
    info: "msg-info",
    warn: "msg-warn",
  };

  return (
    <div className={`msg-wrapper ${classMap[type] || ""}`}>
      <span data-testid={`${classMap[type]}`} id={`${classMap[type]}`}>
        {text}
      </span>
    </div>
  );
};

export default Msg_in_Body;
