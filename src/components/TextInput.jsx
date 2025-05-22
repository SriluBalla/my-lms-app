// components/TextInput.jsx
import React from "react";
import "../styles/TextInput.css";

const TextInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      {required && <span className="required"> *</span>}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  </div>
);

export default TextInput;
