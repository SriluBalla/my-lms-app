import React, { useState } from "react";
import "../styles/main.css"; // Adjust if needed

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  showRules = true,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="password-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        data-testid={name}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        minLength={8}
        maxLength={50}
        placeholder={placeholder}
        autoComplete={name === "password" ? "new-password" : "off"}
      />
      <button
        type="button"
        className="toggle-password"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? "Hide" : "Show"}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {showRules && (
        <ul className="password-rules">
          <li className={/[A-Z]/.test(value) ? "valid" : "invalid"}>
            One uppercase letter
          </li>
          <li className={/[a-z]/.test(value) ? "valid" : "invalid"}>
            One lowercase letter
          </li>
          <li className={/\d/.test(value) ? "valid" : "invalid"}>One number</li>
          <li className={/[@$!%*?&]/.test(value) ? "valid" : "invalid"}>
            One special character
          </li>
          <li className={value.length >= 8 ? "valid" : "invalid"}>
            At least 8 characters
          </li>
        </ul>
      )}
    </div>
  );
};

export default PasswordInput;
