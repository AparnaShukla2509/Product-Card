import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils/helpers";
import "./Button.css";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  onClick,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={classNames(
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth && "btn--full-width",
        loading && "btn--loading",
        className
      )}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}
      <span className="btn__text">{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost", "success"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
