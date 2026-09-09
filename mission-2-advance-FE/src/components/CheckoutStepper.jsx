import "./CheckoutStepper.css";

const steps = ["Pilih Metode", "Bayar", "Selesai"];

function CheckoutStepper({ currentStep = 0 }) {
  return (
    <div className="checkout-stepper">
      {steps.map((label, i) => (
        <div className="checkout-step" key={label}>
          <div
            className={`checkout-step-circle ${i <= currentStep ? "active" : ""}`}
          />
          <span
            className={`checkout-step-label ${i === currentStep ? "current" : ""}`}>
            {label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`checkout-step-line ${i < currentStep ? "active" : ""}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CheckoutStepper;
