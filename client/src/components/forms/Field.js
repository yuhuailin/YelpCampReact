import React from "react";

export default ({
  input,
  label,
  type,
  placeholder,
  required,
  meta: { error, touched }
}) => {
  return (
    <div>
      <label>
        {label}
        <span style={{ color: "red" }}>{required}</span>
      </label>
      <input
        {...input}
        className="form-control"
        type={type}
        placeholder={placeholder}
      />
      <div style={{ marginBottom: "20px", color: "red" }}>
        {touched && error}
      </div>
    </div>
  );
};
