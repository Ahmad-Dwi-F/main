import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountSidebar from "../components/AccountSidebar";
import { useAuthStore } from "../store/authStore";
import { useTutorProfile } from "../hooks/useTutorProfile";
import { useTutorCourses } from "../hooks/useTutorCourses";
import { useDebounce } from "../hooks/useDebounce";
import { tutorSayaApi } from "../services/api/tutorSayaApi";
import { getApiMessage } from "../utils/apiError";
import { assetUrl } from "../utils/assetUrl";
import { avatarUrl } from "../utils/avatars";
import "./DashboardTutor.css";

const TABS = [
  { id: "semua", label: "Semua Kelas" },
  { id: "terbit", label: "Terbit" },
  { id: "draft", label: "Draf" },
];

const STATUS_LABEL = { terbit: "Terbit", draft: "Draf" };
const PAGE_SIZE = 5;

const formatRupiah = (value) =>
  `Rp${new Intl.NumberFormat("id-ID").format(value)}`;

function showError(error) {
  Swal.fire({
    icon: "error",
    title: "Gagal",
    text: getApiMessage(error),
    confirmButtonColor: "#ef4444",
  });
}

function TutorProfileCard({ user, profile, loading, onSave }) {
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const value = draft ?? profile?.profession ?? "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(value.trim());
      setDraft(null);
      Swal.fire({
        icon: "success",
        title: "Profil tutor disimpan",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      showError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="DashboardTutor-profile">
      <img
        src={avatarUrl(user?.avatar)}
        alt=""
        className="DashboardTutor-profile-avatar"
      />
      <div className="DashboardTutor-profile-info">
        <h2 className="DashboardTutor-profile-name">
          {profile?.name ?? user?.nama}
        </h2>
        <p className="DashboardTutor-profile-hint">
          Nama dan foto tutor mengikuti foto Profil.
          <br />
          {profile
            ? ""
            : " Profil tutor dibuat otomatis saat kamu membuat kelas pertama !"}
        </p>
      </div>
      <form className="DashboardTutor-profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Profesi (opsional), mis. Senior Accountant"
          maxLength={100}
          aria-label="Profesi"
          disabled={loading}
        />
        <button
          type="submit"
          className="DashboardTutor-profile-save"
          disabled={saving || loading}>
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </section>
  );
}

function CourseCard({ course, onToggleStatus, onDelete }) {
  const hasDiscount = course.discount > 0;

  return (
    <div className="DashboardTutor-card">
      <img
        src={assetUrl(course.image)}
        alt={course.title}
        className="DashboardTutor-card-image"
      />
      <div className="DashboardTutor-card-body">
        <div className="DashboardTutor-card-top">
          <h3 className="DashboardTutor-card-title">{course.title}</h3>
          <span
            className={`DashboardTutor-badge DashboardTutor-badge-${course.status}`}>
            {STATUS_LABEL[course.status]}
          </span>
        </div>
        <p className="DashboardTutor-card-meta">
          {course.category} · {course.participantCount} peserta
        </p>
        <p className="DashboardTutor-card-price">
          {hasDiscount && (
            <span className="DashboardTutor-card-old-price">
              {formatRupiah(course.originalPrice)}
            </span>
          )}
          <strong>{formatRupiah(course.price)}</strong>
          {hasDiscount && (
            <span className="DashboardTutor-card-discount">
              Diskon {course.discount}%
            </span>
          )}
        </p>
        <div className="DashboardTutor-card-actions">
          <Link
            to={`/dashboard-tutor/ubah/${course.id}`}
            className="DashboardTutor-action">
            Ubah
          </Link>
          <button
            type="button"
            className="DashboardTutor-action"
            onClick={() => onToggleStatus(course)}>
            {course.status === "terbit" ? "Sembunyikan" : "Terbitkan"}
          </button>
          <button
            type="button"
            className="DashboardTutor-action DashboardTutor-action-danger"
            onClick={() => onDelete(course)}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardTutor() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const {
    profile,
    loading: profileLoading,
    saveProfession,
  } = useTutorProfile();

  const [activeTab, setActiveTab] = useState("semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const keyword = useDebounce(search.trim(), 400);
  const { courses, loading, error, reload } = useTutorCourses({
    status: activeTab === "semua" ? undefined : activeTab,
    q: keyword || undefined,
  });

  const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));
  const currentPageCourses = courses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
  };

  const handleToggleStatus = async (course) => {
    const next = course.status === "terbit" ? "draft" : "terbit";
    try {
      await tutorSayaApi.setStatus(course.id, next);
      reload();
    } catch (err) {
      showError(err);
    }
  };

  const handleDelete = (course) => {
    Swal.fire({
      title: "Hapus Kelas?",
      text: `Kelas "${course.title}" akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        await tutorSayaApi.removeCourse(course.id);
        reload();
        Swal.fire({
          icon: "success",
          title: "Kelas dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        showError(err);
      }
    });
  };

  const hasFilter = activeTab !== "semua" || keyword !== "";

  let content;
  if (loading) {
    content = <p className="DashboardTutor-empty">Memuat kelas...</p>;
  } else if (error) {
    content = (
      <p className="DashboardTutor-empty">
        Gagal memuat kelas. Silakan coba lagi.
      </p>
    );
  } else if (courses.length === 0) {
    content = (
      <p className="DashboardTutor-empty">
        {hasFilter
          ? "Tidak ada kelas yang cocok dengan filter dan pencarian."
          : 'Belum ada kelas. Klik "Buat Kelas Baru" untuk memulai.'}
      </p>
    );
  } else {
    content = currentPageCourses.map((course) => (
      <CourseCard
        key={course.id}
        course={course}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    ));
  }

  return (
    <div className="DashboardTutor-container">
      <Navbar />

      <div className="DashboardTutor-header">
        <div>
          <h1>Daftar Kelas</h1>
          <p>Berbagi Materi Belajar Untuk Meningkatkan Pengetahuan !</p>
        </div>
        <button
          type="button"
          className="DashboardTutor-btn"
          onClick={() => navigate("/dashboard-tutor/buat")}>
          Buat Kelas Baru
          <span className="DashboardTutor-btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </button>
      </div>

      <div className="DashboardTutor-layout">
        <AccountSidebar />

        <div className="DashboardTutor-content">
          <TutorProfileCard
            user={user}
            profile={profile}
            loading={profileLoading}
            onSave={saveProfession}
          />

          <div className="DashboardTutor-toolbar">
            <div className="DashboardTutor-tabs">
              {TABS.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  className={`DashboardTutor-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabChange(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="DashboardTutor-search">
              <input
                type="text"
                placeholder="Cari Kelas"
                aria-label="Cari kelas"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {content}

          {totalPages > 1 && (
            <div className="DashboardTutor-pagination">
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

export default DashboardTutor;
