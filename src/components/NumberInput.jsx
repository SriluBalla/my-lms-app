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
    <div className="num-label">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id="numField"
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className={error ? "error" : ""}
      />
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default NumberInput;
