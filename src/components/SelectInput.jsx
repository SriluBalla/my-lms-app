import React from "react";

const SelectInput = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = "-- Select --",
  error,
  required = false,
}) => {
  return (
    <div className="ddl-select">
      <label htmlFor={name}>{label}</label>
      <select
        id={id}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        className={error ? "error" : ""}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default SelectInput;
