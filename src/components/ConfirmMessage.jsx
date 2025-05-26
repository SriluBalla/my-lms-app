import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

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

  const styles = {
    base: "flex items-start gap-3 p-3 rounded-md text-sm my-2 font-medium border shadow-sm max-w-md relative",
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  const icons = {
    success: <CheckCircle size={20} className="mt-0.5" />,
    error: <AlertTriangle size={20} className="mt-0.5" />,
  };

  return (
    <div className={`${styles.base} ${styles[type]}`}>
      {icons[type]}
      <span className="flex-1">{text}</span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="absolute top-1.5 right-2 text-inherit hover:opacity-70"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ConfirmMessage;
