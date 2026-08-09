import { useEnrollments } from "../hooks/useEnrollments";
import { useOrders } from "../hooks/useOrders";
import { createOrder } from "../utils/createOrder";
import { ADMIN_FEE } from "../data/constants";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutStepper from "../components/CheckoutStepper";
import CountdownTimer from "../components/atoms/CountdownTimer";
import SelectedPaymentCard from "../components/SelectedPaymentCard";
import PaymentInstructions from "../components/PaymentInstructions";
import OrderCourseCard from "../components/OrderCourseCard";
import { courses } from "../data/courses";
import { findPaymentMethod } from "../data/paymentMethods";
import "../styles/CheckoutLayout.css";
import "./Bayar.css";

function Bayar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addOrder } = useOrders();
  const { enrollCourse } = useEnrollments();

  const course = courses.find((c) => c.id === id);
  const methodId = location.state?.selectedMethod ?? "bca";
  const method = findPaymentMethod(methodId);

  if (!course || !method) {
    return (
      <div>
        <Navbar />
        <p className="metode-not-found">Data pesanan tidak ditemukan.</p>
      </div>
    );
  }

  const total = course.price + ADMIN_FEE;
  const formattedPrice = new Intl.NumberFormat("id-ID").format(course.price);
  const formattedAdmin = new Intl.NumberFormat("id-ID").format(ADMIN_FEE);
  const formattedTotal = new Intl.NumberFormat("id-ID").format(total);

  const handlePay = () => {
    addOrder(createOrder(course, methodId, "berhasil"));
    enrollCourse(course.id);
    navigate(`/selesai/${id}`);
  };

  const handleChangeMethod = () => {
    navigate(`/metode-bayar/${id}`, {
      state: { mode: "ubah", selectedMethod: method.id },
    });
  };
  return (
    <div className="checkout-page">
      <div className="metode-header">
        <Navbar />
        <div className="metode-stepper-slot">
          <CheckoutStepper currentStep={1} />
        </div>
      </div>

      <CountdownTimer
        durationSeconds={3600}
        onExpire={() => {
          addOrder(createOrder(course, methodId, "menunggu"));
          navigate(`/tertunda/${id}`);
        }}
      />

      <div className="metode-main">
        <div className="metode-left">
          <section className="metode-section">
            <h2 className="metode-section-title">Metode Pembayaran</h2>
            <SelectedPaymentCard method={method} />

            <h2 className="metode-section-title">Ringkasan Pesanan</h2>
            <div className="metode-summary-row">
              <span>Video Learning: {course.title}</span>
              <span className="metode-summary-value">Rp{formattedPrice}</span>
            </div>
            <div className="metode-summary-row">
              <span>Biaya Admin</span>
              <span className="metode-summary-value">Rp{formattedAdmin}</span>
            </div>
            <hr className="metode-summary-divider" />
            <div className="metode-summary-row metode-summary-total">
              <span>Total Pembayaran</span>
              <span className="metode-summary-total-value">
                Rp{formattedTotal}
              </span>
            </div>

            <div className="bayar-buttons">
              <button
                type="button"
                className="bayar-btn-ganti"
                onClick={handleChangeMethod}>
                Ganti Metode Pembayaran
              </button>
              <button
                type="button"
                className="bayar-btn-bayar"
                onClick={handlePay}>
                Bayar Sekarang
              </button>
            </div>
          </section>

          {method.instructions && (
            <PaymentInstructions groups={method.instructions} />
          )}
        </div>

        <aside className="metode-right">
          <OrderCourseCard
            image={course.image}
            title={course.title}
            price={course.price}
            originalPrice={course.originalPrice}
            includes={course.includes}
            language={course.language}
          />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default Bayar;
