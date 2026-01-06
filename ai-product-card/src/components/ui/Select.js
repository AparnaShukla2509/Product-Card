import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils/helpers";
import "./Select.css";

const Select = forwardRef(({
  label,
  id,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select an option",
  error,
  disabled = false,
  required = false,
  className,
  ...props
}, ref) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={classNames("select-group", error && "select-group--error", className)}>
      {label && (
        <label htmlFor={selectId} className="select-group__label">
          {label}
          {required && <span className="select-group__required">*</span>}
        </label>
      )}
      <div className="select-group__wrapper">
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          className="select-group__select"
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.icon ? `${option.icon} ${option.label}` : option.label}
            </option>
          ))}
        </select>
        <span className="select-group__arrow" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {error && (
        <span id={`${selectId}-error`} className="select-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = "Select";

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
