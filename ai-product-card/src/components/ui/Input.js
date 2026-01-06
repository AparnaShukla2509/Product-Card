import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils/helpers";
import "./Input.css";

const Input = forwardRef(({
  label,
  id,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  required = false,
  maxLength,
  className,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={classNames("input-group", error && "input-group--error", className)}>
      {label && (
        <label htmlFor={inputId} className="input-group__label">
          {label}
          {required && <span className="input-group__required">*</span>}
        </label>
      )}
      <div className="input-group__wrapper">
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className="input-group__input"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {maxLength && (
          <span className="input-group__counter">
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="input-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

export default Input;
