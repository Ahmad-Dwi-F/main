import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PesananCard from "../components/PesananCard";
import { useOrders } from "../hooks/useOrders";
import profilIcon from "../assets/profil-icon.png";
import kelasIcon from "../assets/kelas-icon.png";
import pesananIcon from "../assets/pesanan-icon.png";
import "./PesananSaya.css";

const TABS = [
  { id: "semua", label: "Semua Pesanan" },
  { id: "menunggu", label: "Menunggu" },
  { id: "berhasil", label: "Berhasil" },
  { id: "gagal", label: "Gagal" },
];

const EMPTY_MESSAGE = {
  idle: "Memuat pesanan...",
  loading: "Memuat pesanan...",
  error: "Gagal memuat pesanan. Silakan coba lagi.",
};
const PAGE_SIZE = 5;

function PesananSaya() {
  const { orders, status, cancelOrder } = useOrders({ autoLoad: true });

  const navigate = useNavigate();

  const handleContinuePayment = (order) => {
    navigate(`/bayar/${order.courseId}`, {
      state: { selectedMethod: order.methodId ?? "bca" },
    });
  };

  const [activeTab, setActiveTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("terbaru");
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeTab !== "semua") {
      result = result.filter((o) => o.status === activeTab);
    }

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter((o) => o.title.toLowerCase().includes(keyword));
    }

    result = [...result].sort((a, b) => {
      const timeA = new Date(a.paymentTime).getTime();
      const timeB = new Date(b.paymentTime).getTime();
      return sortOrder === "terbaru" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [orders, activeTab, search, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const currentPageOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
  };

  const handleCancel = (order) => {
    Swal.fire({
      title: "Batalkan Pesanan?",
      html: `Apakah Anda yakin ingin membatalkan pesanan untuk kelas <b>${order.title}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
      confirmButtonText: "Ya, Batalkan",
      cancelButtonText: "Tidak, Kembali",
      reverseButtons: true,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Membatalkan pesanan...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await cancelOrder(order.orderId);
        Swal.fire({
          title: "Dibatalkan!",
          text: "Pesanan Anda berhasil dibatalkan.",
          icon: "success",
          confirmButtonColor: "#22c55e",
        });
      } catch (message) {
        Swal.fire({
          title: "Gagal!",
          text: message,
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    });
  };

  return (
    <div>
      <Navbar />

      <div className="pesanan-header">
        <h1>Daftar Pesanan</h1>
        <p>Informasi terperinci mengenai pembelian</p>
      </div>

      <div className="pesanan-layout">
        <aside className="pesanan-sidebar">
          <Link to="/profil" className="pesanan-sidebar-item">
            <img src={profilIcon} alt="" className="pesanan-sidebar-icon" />
            <span>Profil Saya</span>
          </Link>
          <Link to="/kelas-saya" className="pesanan-sidebar-item">
            <img src={kelasIcon} alt="" className="pesanan-sidebar-icon" />
            <span> Kelas Saya</span>
          </Link>
          <Link
            to="/pesanan-saya"
            className="pesanan-sidebar-item pesanan-sidebar-item-active">
            <img src={pesananIcon} alt="" className="pesanan-sidebar-icon" />
            <span> Pesanan Saya</span>
          </Link>
        </aside>

        <div className="pesanan-content">
          <div className="pesanan-toolbar">
            <div className="pesanan-tabs">
              {TABS.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  className={`pesanan-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabChange(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pesanan-filters">
              <div className="pesanan-search">
                <input
                  type="text"
                  placeholder="Cari Kelas"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <select
                className="pesanan-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}>
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
            </div>
          </div>

          {currentPageOrders.length === 0 ? (
            <p className="pesanan-empty">
              {EMPTY_MESSAGE[status] ?? "Belum ada pesanan di kategori ini."}
            </p>
          ) : (
            currentPageOrders.map((order) => (
              <PesananCard
                key={order.orderId}
                order={order}
                onCancel={() => handleCancel(order)}
                onContinuePayment={handleContinuePayment}
              />
            ))
          )}

          {totalPages > 1 && (
            <div className="pesanan-pagination">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}>
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  type="button"
                  key={p}
                  className={page === p ? "active" : ""}
                  onClick={() => setPage(p)}>
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}>
                ›
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PesananSaya;
