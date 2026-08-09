import Button from "./atoms/Button";
import { formatOrderDate } from "../utils/formatDate";
import "./PesananCard.css";

const STATUS_LABEL = {
  berhasil: "Berhasil",
  menunggu: "Menunggu",
  gagal: "Gagal",
};

function PesananCard({ order, onCancel, onContinuePayment }) {
  const formattedPrice = new Intl.NumberFormat("id-ID").format(order.price);
  const formattedTotal = new Intl.NumberFormat("id-ID").format(order.total);

  return (
    <div className="pesanan-card">
      <div className="pesanan-card-header">
        <div className="pesanan-card-meta">
          <span className="pesanan-card-invoice">{order.invoice}</span>
          <span className="pesanan-card-time">
            {formatOrderDate(order.paymentTime)}
          </span>
        </div>
        <span className={`pesanan-status-badge pesanan-status-${order.status}`}>
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <div className="pesanan-card-body">
        <img
          src={order.image}
          alt={order.title}
          className="pesanan-card-image"
        />
        <p className="pesanan-card-title">{order.title}</p>
        <div className="pesanan-card-price">
          <span className="pesanan-card-price-label">Harga</span>
          <span className="pesanan-card-price-value">Rp{formattedPrice}</span>
        </div>
      </div>

      <div className="pesanan-card-footer">
        <span>Total Pembayaran</span>
        <span className="pesanan-card-total-value">Rp{formattedTotal}</span>
      </div>

      {order.status === "menunggu" && (
        <div className="pesanan-card-actions">
          <button
            type="button"
            className="pesanan-continue-btn"
            onClick={() => onContinuePayment(order)}>
            Lanjutkan Pembayaran
          </button>
          <Button
            variant="outline-danger"
            onClick={() => onCancel(order.orderId)}>
            Batalkan Pesanan
          </Button>
        </div>
      )}
    </div>
  );
}

export default PesananCard;
