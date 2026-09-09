import "./PaymentMethodGroup.css";
function renderPaymentOptionContent(option) {
  if (option.logos) {
    return (
      <span className="payment-option-logos">
        {option.logos.map((logo, index) => (
          <img
            key={index}
            className="payment-logo-img"
            src={logo.image}
            alt={logo.label}
          />
        ))}
      </span>
    );
  }

  if (option.image) {
    return (
      <>
        <img
          className="payment-option-badge"
          src={option.image}
          alt={option.label}
        />
        <span className="payment-option-label">{option.label}</span>
      </>
    );
  }

  return (
    <>
      <span className="payment-option-badge">{option.initials}</span>
      <span className="payment-option-label">{option.label}</span>
    </>
  );
}
function PaymentMethodGroup({
  group,
  isOpen,
  onToggle,
  selectedMethod,
  onSelect,
}) {
  return (
    <div className="payment-group">
      <button type="button" className="payment-group-title" onClick={onToggle}>
        {group.title}
        <span className={`payment-group-chevron ${isOpen ? "open" : ""}`}>
          ⌄
        </span>
      </button>

      <div className={`payment-group-options ${isOpen ? "open" : ""}`}>
        {group.options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={`payment-option ${selectedMethod === option.id ? "selected" : ""}`}
            onClick={() => onSelect(option.id)}>
            <span className="payment-option-left">
              {renderPaymentOptionContent(option)}
            </span>

            {selectedMethod === option.id && (
              <span className="payment-option-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethodGroup;
