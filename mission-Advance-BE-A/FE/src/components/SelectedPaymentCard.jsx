import { useState } from "react";
import "./SelectedPaymentCard.css";

function SelectedPaymentCard({ method }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(method.vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (method.type === "bank") {
    return (
      <div className="selected-payment-card">
        <img
          src={method.image}
          alt={method.label}
          className="selected-payment-logo"
        />
        <p className="selected-payment-desc">
          Bayar Melalui Virtual Account {method.label.replace("Bank ", "")}
        </p>
        <div className="selected-payment-va">
          <span>{method.vaDisplay}</span>
          <button
            type="button"
            className="selected-payment-copy"
            onClick={handleCopy}>
            {copied ? "Tersalin" : "Salin"}
          </button>
        </div>
      </div>
    );
  }

  if (method.type === "ewallet") {
    return (
      <div className="selected-payment-card">
        <img
          src={method.image}
          alt={method.label}
          className="selected-payment-logo"
        />
        <p className="selected-payment-desc">Bayar dengan {method.label}</p>
        <div className="selected-payment-qr-box">QR Code</div>
        <p className="selected-payment-qr-note">
          Scan kode ini melalui aplikasi {method.label}
        </p>
      </div>
    );
  }

  return (
    <div className="selected-payment-card selected-payment-card-form">
      <p className="selected-payment-desc">Masukkan Detail Kartu</p>
      <input type="text" placeholder="Nomor Kartu" className="card-input" />
      <div className="card-input-row">
        <input type="text" placeholder="MM/YY" className="card-input" />
        <input type="text" placeholder="CVV" className="card-input" />
      </div>
      <input
        type="text"
        placeholder="Nama Pemilik Kartu"
        className="card-input"
      />
    </div>
  );
}

export default SelectedPaymentCard;
