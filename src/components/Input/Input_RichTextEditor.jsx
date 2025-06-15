import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Stylesheet

const RichTextEditor = ({
  id,
  name,
  label,
  p,
  placeholder = "",
  value,
  onChange,
  maxLength = 1000,
  height = 250,
  width,
  required = false,
  error,
}) => {
  const handleChange = (content) => {
    if (!maxLength || content.length <= maxLength) {
      onChange(content);
    }
  };

  return (
    <div>
      <div className="richTextEditor">
        <label htmlFor={id}>{label}</label>
        {/* <p htmlFor={id}>{p}</p> */}
        {p && (
          <pre >
            {p}
          </pre>
        )}

        <ReactQuill
          id={id}
          data-testid={name}
          theme="snow"
          name={name}
          value={value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            height: `${height}px`,
            width: width || "80%",
            marginBottom: "1rem",
            backgroundColor: "white",
            border: "1px solid black",
          }}
          className={error ? "error" : ""}
        />
      </div>

      <em>
        {value?.length || 0}/{maxLength} characters
      </em>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default RichTextEditor;
