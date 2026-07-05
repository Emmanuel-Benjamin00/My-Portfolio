import PropTypes from "prop-types";

/* Shared form controls used across the Resume Builder. */

export function Input({ label, value, onChange, placeholder, required }) {
  return (
    <label className="rb-field">
      {label && (
        <span className="rb-label">
          {label}
          {required && <span className="rb-req">*</span>}
        </span>
      )}
      <input
        className="rb-input"
        type="text"
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 3, required }) {
  return (
    <label className="rb-field">
      {label && (
        <span className="rb-label">
          {label}
          {required && <span className="rb-req">*</span>}
        </span>
      )}
      <textarea
        className="rb-input rb-textarea"
        value={value || ""}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <label className="rb-field">
      {label && <span className="rb-label">{label}</span>}
      <select
        className="rb-input rb-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AddBtn({ label, onClick }) {
  return (
    <button type="button" className="rb-add" onClick={onClick}>
      + {label}
    </button>
  );
}

export function RemoveBtn({ onClick, disabled }) {
  return (
    <button
      type="button"
      className="rb-remove"
      onClick={onClick}
      disabled={disabled}
      aria-label="Remove"
      title={disabled ? "At least one required" : "Remove"}
    >
      ×
    </button>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
Textarea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
};
Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
AddBtn.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
RemoveBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
