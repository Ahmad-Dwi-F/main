import "./Button.css";

function Button({
  variant = "primary",
  type = "button",
  onClick,
  children,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`action-btn action-btn-${variant} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
