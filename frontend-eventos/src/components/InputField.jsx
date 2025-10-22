// src/components/InputField.jsx
export const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  rows,
  min,
  step,
  required = false,
}) => {
  const isTextArea = type === "textarea";

  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="font-weight-bold">
        {label}
      </label>

      {isTextArea ? (
        <textarea
          className="form-control bg-dark text-white border-secondary"
          id={name}
          name={name}
          rows={rows || 3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        ></textarea>
      ) : (
        <input
          type={type}
          className="form-control bg-dark text-white border-secondary"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          step={step}
          required={required}
        />
      )}
    </div>
  );
};
