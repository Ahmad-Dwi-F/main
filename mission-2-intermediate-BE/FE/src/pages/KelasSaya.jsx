import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KelasCard from "../components/KelasCard";
import { useMyCourseList } from "../hooks/useMyCourseList";
import profilIcon from "../assets/profil-icon.png";
import kelasIcon from "../assets/kelas-icon.png";
import pesananIcon from "../assets/pesanan-icon.png";
import "./KelasSaya.css";

const TABS = [
  { id: "semua", label: "Semua Kelas" },
  { id: "berjalan", label: "Sedang Berjalan" },
  { id: "selesai", label: "Selesai" },
];

const PAGE_SIZE = 5;

const EMPTY_MESSAGE = {
  loading: "Memuat kelas...",
  error: "Gagal memuat kelas. Silakan coba lagi.",
};

function KelasSaya() {
  const { items, status } = useMyCourseList();

  const [activeTab, setActiveTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = items;

    if (activeTab === "berjalan") {
      result = result.filter((item) => item.progress < 100);
    } else if (activeTab === "selesai") {
      result = result.filter((item) => item.progress >= 100);
    }

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter((item) =>
        item.course.title.toLowerCase().includes(keyword),
      );
    }

    return result;
  }, [items, activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
  };

  return (
    <div>
      <Navbar />

      <div className="kelas-saya-header">
        <h1>Daftar Kelas</h1>
        <p>Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!</p>
      </div>

      <div className="kelas-saya-layout">
        <aside className="kelas-saya-sidebar">
          <Link to="/profil" className="kelas-saya-sidebar-item">
            <img src={profilIcon} alt="" className="kelas-saya-sidebar-icon" />
            <span>Profil Saya</span>
          </Link>
          <Link
            to="/kelas-saya"
            className="kelas-saya-sidebar-item kelas-saya-sidebar-item-active">
            <img src={kelasIcon} alt="" className="kelas-saya-sidebar-icon" />
            <span>Kelas Saya</span>
          </Link>
          <Link to="/pesanan-saya" className="kelas-saya-sidebar-item">
            <img src={pesananIcon} alt="" className="kelas-saya-sidebar-icon" />
            <span>Pesanan Saya</span>
          </Link>
        </aside>

        <div className="kelas-saya-content">
          <div className="kelas-saya-toolbar">
            <div className="kelas-saya-tabs">
              {TABS.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  className={`kelas-saya-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabChange(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="kelas-saya-search">
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
          </div>

          {currentPageItems.length === 0 ? (
            <p className="kelas-saya-empty">
              {EMPTY_MESSAGE[status] ?? "Belum ada kelas di kategori ini."}
            </p>
          ) : (
            currentPageItems.map((item) => (
              <KelasCard key={item.course.id} {...item} />
            ))
          )}

          {totalPages > 1 && (
            <div className="kelas-saya-pagination">
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

export default KelasSaya;
