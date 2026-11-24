import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CheckoutStepper from "../components/CheckoutStepper";
import OrderStatusCard from "../components/OrderStatusCard";
import "../styles/CheckoutLayout.css";

function Selesai() {
  const navigate = useNavigate();

  return (
    <div className="checkout-page">
      <div className="metode-header">
        <Navbar />
        <div className="metode-stepper-slot">
          <CheckoutStepper currentStep={2} />
        </div>
      </div>

      <OrderStatusCard
        status="success"
        onViewDetail={() => navigate("/pesanan-saya")}
      />
    </div>
  );
}

export default Selesai;
