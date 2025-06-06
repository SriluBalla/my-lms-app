import React from "react";

const QUESTION_TYPES = [
  { key: "checkbox", label: "Checkbox (Multiple Answers)" },
  // Future additions:
  // { key: "truefalse", label: "True / False" },
  // { key: "radiobutton", label: "Radio Button (Single Answer)" },
];

export default function DDL_SelectType({ value, onChange }) {

  return (
    <div className="ddl-group">
      <select
        id="type"
        name="type"
        className="dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value=""> -- Select Question Type -- </option>
        {QUESTION_TYPES.map((type) => (
          <option key={type.key} value={type.key}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}
