import React from "react";
import "../styles/main.css"; // Adjust path if needed

const EmailInput = ({
  label = "Email",
  name = "email",
  value,
  onChange,
  error,
  required = true,
  placeholder,
}) => {
  return (
    <div className="email-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="email"
        value={value}
        onChange={(e) => {
          const lowercase = e.target.value.toLowerCase();
          onChange({ ...e, target: { ...e.target, value: lowercase } });
        }}
        required={required}
        maxLength={100}
        placeholder={placeholder}
        autoComplete="email"
      />
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default EmailInput;
