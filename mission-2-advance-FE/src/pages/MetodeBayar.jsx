import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEnrollments } from "../hooks/useEnrollments";
import { useOrders } from "../hooks/useOrders";
import { createOrder } from "../utils/createOrder";
import { ADMIN_FEE } from "../data/constants";
import { useState } from "react";
import { courses } from "../data/courses";
import { paymentGroups } from "../data/paymentMethods";
import { courseCardServices } from "../services/api/serviceApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutStepper from "../components/CheckoutStepper";
import PaymentMethodGroup from "../components/PaymentMethodGroup";
import OrderCourseCard from "../components/OrderCourseCard";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import "../styles/CheckoutLayout.css";
import "./MetodeBayar.css";

function MetodeBayar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addOrder } = useOrders();
  const { enrollCourse } = useEnrollments();
  const course = courses.find((c) => c.id === id);

  const isUbahMode = location.state?.mode === "ubah";

  const [openGroups, setOpenGroups] = useState(
    isUbahMode ? [] : paymentGroups.map((g) => g.id),
  );
  const [selectedMethod, setSelectedMethod] = useState(
    location.state?.selectedMethod ?? "bca",
  );

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev, groupId],
    );
  };

  if (!course) {
    return (
      <div>
        <Navbar />
        <p className="metode-not-found">Kelas tidak ditemukan.</p>
      </div>
    );
  }

  const total = course.price + ADMIN_FEE;
  const formattedPrice = new Intl.NumberFormat("id-ID").format(course.price);
  const formattedAdmin = new Intl.NumberFormat("id-ID").format(ADMIN_FEE);
  const formattedTotal = new Intl.NumberFormat("id-ID").format(total);

  const handleCheckout = async () => {
    if (isUbahMode) {
      try {
        const orderData = createOrder(course, selectedMethod, "berhasil");

        await courseCardServices.createOrder(orderData);
        addOrder(orderData);
        enrollCourse(course.id);
        navigate(`/selesai/${id}`);
      } catch (error) {
        console.error("Gagal menyimpan pesanan:", error);
        alert("Terjadi kesalahan saat memproses pembayaran.");
      }
    } else {
      navigate(`/bayar/${id}`, { state: { selectedMethod } });
    }
  };

  const handleTunda = async () => {
    Swal.fire({
      title: "Tunda Pembayaran?",
      text: 'Pesanan ini akan disimpan di daftar "Pesanan Saya" dengan status Menunggu. Anda bisa membayarnya nanti.',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Tunda",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Menyimpan Pesanan...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const pendingOrder = createOrder(course, selectedMethod, "menunggu");

          await courseCardServices.createOrder(pendingOrder);

          addOrder(pendingOrder);
          Swal.close();
          navigate(`/tertunda/${id}`);
        } catch (error) {
          console.error("Gagal menyimpan pesanan:", error);

          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat menunda pesanan. Silakan coba lagi.",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };

  return (
    <div className="checkout-page">
      <div className="metode-header">
        <Navbar />
        <div className="metode-stepper-slot">
          <CheckoutStepper currentStep={0} />
        </div>
      </div>

      <div className="metode-main">
        <div
          className={`metode-left ${isUbahMode ? "metode-left-reversed" : ""}`}>
          <section className="metode-section metode-methods">
            <h2 className="metode-section-title">
              {isUbahMode ? "Ubah Metode Pembayaran" : "Metode Pembayaran"}
            </h2>
            {paymentGroups.map((group) => (
              <PaymentMethodGroup
                key={group.id}
                group={group}
                isOpen={openGroups.includes(group.id)}
                onToggle={() => toggleGroup(group.id)}
                selectedMethod={selectedMethod}
                onSelect={setSelectedMethod}
              />
            ))}
          </section>

          <section className="metode-section metode-summary">
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
            <button
              type="button"
              className="metode-btn-buy"
              onClick={handleCheckout}>
              {isUbahMode ? "Bayar Sekarang" : "Beli Sekarang"}
            </button>
            {isUbahMode && (
              <Button
                variant="text-muted"
                className="metode-btn-tunda"
                onClick={handleTunda}>
                Tunda Pembayaran
              </Button>
            )}
          </section>
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

export default MetodeBayar;
