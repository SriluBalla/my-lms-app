import React, { useState } from "react";
import ConfirmMessage from "./ConfirmMsg"; // reuse ConfirmMessage for visual feedback

const ConsoleLog = ({ title = "Console", logs = [] }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (!logs?.length) return null;

  const handleToggle = () => {
    setVisible(!visible);
    setMessage({
      type: "success",
      text: !visible ? "Logs are now visible." : "Logs are hidden.",
    });
  };

  return (
    <div className="my-4">
      <button
        onClick={handleToggle}
        className="text-sm underline text-blue-600 hover:text-blue-800"
      >
        {visible ? "Hide Logs" : "Show Logs"}
      </button>

      {/* show a one-time message on toggle */}
      <ConfirmMessage type={message.type} text={message.text} />

      {visible && (
        <div className="mt-2 p-2 bg-gray-100 border rounded text-xs max-h-60 overflow-y-auto whitespace-pre-wrap">
          <strong className="block mb-1">{title}</strong>
          {logs.map((log, i) => (
            <div key={i} className="mb-1 border-b pb-1">
              {typeof log === "object" ? JSON.stringify(log, null, 2) : log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsoleLog;
