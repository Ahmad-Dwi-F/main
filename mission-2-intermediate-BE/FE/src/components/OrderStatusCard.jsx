import Button from "./atoms/Button";
import successImg from "../assets/success.png";
import pendingImg from "../assets/pending.png";
import "./OrderStatusCard.css";

const STATUS_CONTENT = {
  success: {
    title: "Pembayaran Berhasil!",
    image: successImg,
  },
  pending: {
    title: "Pembayaran Tertunda!",
    image: pendingImg,
  },
};

function OrderStatusCard({ status, onViewDetail }) {
  const content = STATUS_CONTENT[status];

  return (
    <div className="status-card">
      <img
        src={content.image}
        alt={content.title}
        className="status-illustration"
      />
      <h2 className="status-title">{content.title}</h2>
      <p className="status-desc">
        Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika
        ada kendala.
      </p>
      <Button variant="primary" className="status-btn" onClick={onViewDetail}>
        Lihat Detail Pesanan
      </Button>
    </div>
  );
}

export default OrderStatusCard;
