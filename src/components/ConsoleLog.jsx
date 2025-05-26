import React, { useState } from "react";

const ConsoleLog = ({ title = "Console", logs = [] }) => {
  const [visible, setVisible] = useState(false);

  if (!logs?.length) return null;

  return (
    <div className="my-4">
      <button
        onClick={() => setVisible(!visible)}
        className="text-sm underline text-blue-600 hover:text-blue-800"
      >
        {visible ? "Hide Logs" : "Show Logs"}
      </button>
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
