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
  {p && <pre>{p}</pre>}

  <div
    style={{
      height: `${height}px`,
      width: width || "80%",
      marginBottom: "1rem",
      backgroundColor: "white",
      overflow: "hidden",
      border: error ? "1px solid red" : "1px solid #ccc",
      borderRadius: "4px",
      position: "relative",
      zIndex: 0, // ✨ prevent overlapping above other components
    }}
  >
    <ReactQuill
      id={id}
      data-testid={name}
      theme="snow"
      name={name}
      value={value || ""}
      onChange={handleChange}
      placeholder={placeholder}
      style={{
        height: `${height - 42}px`, // subtract toolbar height
        width: "100%",
      }}
      className={error ? "error" : ""}
    />
  </div>
</div>
      <em>
        {value?.length || 0}/{maxLength} characters
      </em>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default RichTextEditor;
