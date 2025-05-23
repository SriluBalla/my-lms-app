import React from "react";

const NumberInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className={error ? "error" : ""}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default NumberInput;
