import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLearningCourse } from "../hooks/useLearningCourse";
import { getFlatItems } from "../utils/curriculum";
import { useAuthStore } from "../store/authStore";
import ModuleList from "../components/ModuleList";
import StarRating from "../components/StarRating";
import FotoNavbar from "../assets/FotoNavbar.png";
import bgnRule from "../assets/bgn-rule.png";
import notifPretest from "../assets/notif.png";
import notifQuiz from "../assets/notif-1.png";
import bgCongrats from "../assets/bgn-congrats.png";
import bgTryAgain from "../assets/bgn-try-again.png";
import piala from "../assets/piala.png";
import { DUMMY_QUESTIONS } from "../data/quizQuestions";
import { calculateQuizResult } from "../utils/quizLogic";
import { formatOrderDate } from "../utils/formatDate";
import { reviewApi } from "../services/api/reviewApi";
import "./BelajarKelas.css";

function ChevronLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#3ecf4c" />
      <path
        d="M12 6v8m0 0l-3-3m3 3l3-3M7 16v1a2 2 0 002 2h6a2 2 0 002-2v-1"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BelajarKelasContent({ course, onSetCompleted }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const id = course.id;
  const { progress, completedIds: completedItems } = course;
  const navigate = useNavigate();
  const setLogOut = useAuthStore((state) => state.setLogOut);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const flatItems = useMemo(
    () => getFlatItems(course.curriculum),
    [course.curriculum],
  );
  const firstIncomplete = flatItems.find(
    (item) => !completedItems.includes(item.key),
  );

  const saveProgress = (materialId, completed) =>
    onSetCompleted(materialId, completed).catch(() =>
      alert("Gagal menyimpan progres. Silakan coba lagi."),
    );

  const [currentItemKey, setCurrentItemKey] = useState(
    firstIncomplete?.key ?? flatItems[0]?.key,
  );
  const [showPopover, setShowPopover] = useState(false);

  const [prevItemKey, setPrevItemKey] = useState(currentItemKey);
  if (currentItemKey !== prevItemKey) {
    setPrevItemKey(currentItemKey);
    setIsTestActive(false);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setShowSubmitModal(false);
    setTestResult(null);
  }

  const handleLogout = () => {
    setLogOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  const currentIndex = flatItems.findIndex((i) => i.key === currentItemKey);
  const currentItem = flatItems[currentIndex] ?? flatItems[0];

  const goToItem = (index) => {
    if (index < 0 || index >= flatItems.length) return;
    setCurrentItemKey(flatItems[index].key);
  };

  const handleSelectAnswer = (optionIdx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIdx,
    }));
  };

  const totalQuestions = DUMMY_QUESTIONS.length;
  const isLastQuestion = currentQuestionIdx === totalQuestions - 1;
  const allQuestionsAnswered =
    Object.keys(userAnswers).length === totalQuestions;

  const handleFinishTest = () => {
    const isPretest = currentItem?.type === "pre-test";
    const { correctCount, wrongCount, scoreValue, isPassed } =
      calculateQuizResult(DUMMY_QUESTIONS, userAnswers, isPretest);

    setTestResult({
      correctCount,
      wrongCount,
      scoreValue,
      isPassed,
      date: new Date(),
    });

    if (isPassed) {
      saveProgress(currentItemKey, true);
    }

    setIsTestActive(false);
    setShowSubmitModal(false);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowSubmitModal(true);
      return;
    }
    setCurrentQuestionIdx((prev) => Math.min(totalQuestions - 1, prev + 1));
  };
  const handleRetryTest = () => {
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setTestResult(null);
    setIsTestActive(true);
  };
  const handleCancelRating = () => {
    setShowRatingModal(false);
    setRatingValue(0);
    setHoverRating(0);
    setReviewText("");
  };

  const handleSubmitReview = async () => {
    try {
      await reviewApi.save(id, { rating: ratingValue, comment: reviewText });
      handleCancelRating();
      alert("Terima kasih! Review kamu sudah tersimpan.");
    } catch (error) {
      alert(
        error.response?.data?.message ??
          "Gagal menyimpan review. Silakan coba lagi.",
      );
    }
  };

  const handleOpenRating = async () => {
    setShowRatingModal(true);
    try {
      const mine = await reviewApi.getMine(id);
      if (mine) {
        setRatingValue(mine.rating);
        setReviewText(mine.comment);
      }
    } catch {
      // gagal memuat review sebelumnya.Silakan coba lagi.
    }
  };

  function renderLeftContent() {
    if (testResult) {
      const label = currentItem?.type === "pre-test" ? "Pretest" : "Quiz";
      return (
        <div className="belajar-rule-container">
          <div className="belajar-rule-banner">
            <img
              src={testResult.isPassed ? bgCongrats : bgTryAgain}
              alt={testResult.isPassed ? "Congrats" : "Try Again"}
              className="belajar-rule-img"
            />
          </div>
          <div className="belajar-rule-content">
            <p className="belajar-result-date-label">Tanggal {label}:</p>
            <p className="belajar-result-date-value">
              {formatOrderDate(testResult.date.toISOString())}
            </p>

            <div className="belajar-result-stats">
              <div
                className={`belajar-result-stat-nilai ${testResult.isPassed ? "passed" : "failed"}`}>
                <span className="belajar-result-stat-label">Nilai</span>
                <span className="belajar-result-stat-value">
                  {testResult.scoreValue}
                </span>
              </div>
              <div className="belajar-result-stat">
                <span className="belajar-result-stat-label">Soal</span>
                <span className="belajar-result-stat-value">
                  {totalQuestions}
                </span>
              </div>
              <div className="belajar-result-stat">
                <span className="belajar-result-stat-label">Benar</span>
                <span className="belajar-result-stat-value correct">
                  ✓ {testResult.correctCount}
                </span>
              </div>
              <div className="belajar-result-stat">
                <span className="belajar-result-stat-label">Salah</span>
                <span className="belajar-result-stat-value wrong">
                  ✕ {testResult.wrongCount}
                </span>
              </div>
            </div>

            <h3 className="belajar-result-title">
              {testResult.isPassed ? "Selesai!" : "Sedikit Lagi!"}
            </h3>
            <p className="belajar-result-desc">
              {testResult.isPassed
                ? `${label} sudah selesai dan kami sudah mengetahui progresmu.`
                : "Kamu sudah menyelesaikan quiz dengan baik namun nilaimu belum cukup untuk melanjutkan materi."}
            </p>
            <p className="belajar-result-desc">
              {testResult.isPassed
                ? "Saatnya memulai kelas!"
                : "Pelajari kembali modul sebelumnya dan kerjakan kembali quiz ini!"}
            </p>

            {!testResult.isPassed && (
              <button
                type="button"
                className="belajar-result-retry-btn"
                onClick={handleRetryTest}>
                ↻ Ulangi Quiz
              </button>
            )}
          </div>
        </div>
      );
    }
    if (isTestActive) {
      return (
        <div className="belajar-quiz-active-layout">
          <div className="belajar-quiz-list-panel">
            <h3 className="belajar-quiz-list-title">List Soal</h3>
            <div className="belajar-quiz-grid">
              {DUMMY_QUESTIONS.map((q, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentQuestionIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`belajar-quiz-num-btn ${
                      isCurrent ? "active" : ""
                    } ${isAnswered ? "answered" : ""}`}
                    onClick={() => setCurrentQuestionIdx(idx)}>
                    {q.id}
                    {isAnswered && <span className="soal-corner-triangle" />}
                  </button>
                );
              })}
            </div>
            <div className="belajar-quiz-alert-box">
              Selesaikan semua soal untuk mengakhiri{" "}
              {currentItem?.type === "pre-test" ? "pretest" : "quiz"}
            </div>
          </div>

          <div className="belajar-quiz-question-panel">
            <h2 className="belajar-quiz-q-title">
              Pertanyaan {currentQuestionIdx + 1}
            </h2>
            <p className="belajar-quiz-q-text">
              {DUMMY_QUESTIONS[currentQuestionIdx].question}
            </p>

            <div className="belajar-quiz-options-list">
              {DUMMY_QUESTIONS[currentQuestionIdx].options.map(
                (optionText, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={`belajar-quiz-option-btn ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => handleSelectAnswer(optIdx)}>
                      <span
                        className={`belajar-quiz-radio ${
                          isSelected ? "selected" : ""
                        }`}>
                        {isSelected && (
                          <span className="belajar-quiz-radio-inner" />
                        )}
                      </span>
                      <span className="belajar-quiz-option-text">
                        {optionText}
                      </span>
                    </button>
                  );
                },
              )}
            </div>

            <div className="belajar-quiz-nav-btns">
              <button
                type="button"
                className="belajar-quiz-nav-prev"
                disabled={currentQuestionIdx === 0}
                onClick={() =>
                  setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))
                }>
                ← Sebelumnya
              </button>
              <button
                type="button"
                className={`belajar-quiz-nav-next ${
                  isLastQuestion ? "belajar-quiz-nav-finish" : ""
                }`}
                disabled={isLastQuestion && !allQuestionsAnswered}
                onClick={handleNextQuestion}>
                {isLastQuestion ? "Selesaikan" : "Selanjutnya"} →
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentItem?.type === "pre-test") {
      return (
        <div className="belajar-rule-container">
          <div className="belajar-rule-banner">
            <img
              src={bgnRule}
              alt="Rules Banner"
              className="belajar-rule-img"
            />
          </div>
          <div className="belajar-rule-content">
            <h2 className="belajar-rule-title">Aturan</h2>
            <p className="belajar-rule-text">
              Kerjakan pretest dengan sebaik mungkin untuk mengukur pemahaman
              awalmu terkait materi yang akan kamu pelajari
            </p>
            <div className="belajar-rule-meta">
              <p>Syarat Nilai Kelulusan: -</p>
              <p>Durasi Ujian: 5 Menit</p>
            </div>
            <p className="belajar-rule-subtext">
              Jangan khawatir, total skor tidak akan mempengaruhi kelulusan dan
              penilaian akhirmu dalam rangkaian kelas ini
            </p>
            <button
              type="button"
              className="belajar-rule-btn"
              onClick={() => setIsTestActive(true)}>
              Mulai Pre-Test
            </button>
          </div>
        </div>
      );
    }

    if (currentItem?.type === "quiz") {
      return (
        <div className="belajar-rule-container">
          <div className="belajar-rule-banner">
            <img
              src={bgnRule}
              alt="Rules Banner"
              className="belajar-rule-img"
            />
          </div>
          <div className="belajar-rule-content">
            <h2 className="belajar-rule-title">Aturan</h2>
            <p className="belajar-rule-text">
              Kerjakan quiz dengan sebaik mungkin untuk mengukur pemahaman
              terkait materi yang telah kamu pelajari
            </p>
            <div className="belajar-rule-meta">
              <p>Syarat Nilai Kelulusan: 60%</p>
            </div>
            <p className="belajar-rule-subtext">
              Kerjakan dengan sebaik mungkin untuk mencapai skor minimal agar
              kamu dapat melanjutkan ke modul berikutnya
            </p>
            <button
              type="button"
              className="belajar-rule-btn"
              onClick={() => setIsTestActive(true)}>
              Mulai Quiz
            </button>
          </div>
        </div>
      );
    }

    if (currentItem?.type === "rangkuman") {
      return (
        <>
          <div className="belajar-video">
            <button
              type="button"
              className="belajar-play-btn"
              onClick={() => console.log("Play rangkuman:", currentItem?.key)}
              aria-label="Putar video rangkuman">
              <PlayIcon />
            </button>
          </div>

          <div className="belajar-content-info">
            <h2 className="belajar-content-title">Download Rangkuman Modul</h2>
            <p className="belajar-content-desc">
              Silakan download rangkuman modul dari materi yang telah kamu
              pelajari
            </p>
            <button
              type="button"
              className="belajar-rangkuman-download-btn"
              onClick={() =>
                console.log("Download rangkuman:", currentItem?.key)
              }>
              <DownloadIcon />
              Download Rangkuman
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="belajar-video">
          <button
            type="button"
            className="belajar-play-btn"
            onClick={() => console.log("Play:", currentItem?.key)}
            aria-label="Putar video">
            <PlayIcon />
          </button>
        </div>

        <div className="belajar-content-info">
          <h2 className="belajar-content-title">{currentItem?.title}</h2>
          <p className="belajar-content-desc">{course.desc}</p>

          <div className="belajar-instructor-row">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="belajar-instructor-avatar"
            />
            <div>
              <p className="belajar-instructor-name">
                {course.instructor.name}
              </p>
              <p className="belajar-instructor-role">
                {course.instructor.role}
              </p>
            </div>
          </div>

          <div className="belajar-rating-row">
            <StarRating rating={course.rating ?? 0} size="sm" />
            <span className="belajar-rating-value">
              {course.rating ?? 0} ({course.reviewCount})
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="belajar-page">
      <header className="belajar-topbar">
        <div className="belajar-topbar-left">
          <Link to="/kelas-saya" className="belajar-back" aria-label="Kembali">
            <ChevronLeftIcon />
          </Link>
          <h1 className="belajar-course-title">{course.title}</h1>
        </div>

        <div className="belajar-topbar-right">
          <button
            type="button"
            className={`belajar-progress-trigger ${
              progress >= 100 ? "belajar-progress-complete" : ""
            }`}
            onClick={() => setShowPopover((v) => !v)}>
            {progress >= 100 ? (
              <>
                <img src={piala} alt="" className="belajar-progress-trophy" />
                <span className="belajar-progress-complete-label">
                  Ambil Sertifikat
                </span>
              </>
            ) : (
              <>
                <span className="belajar-progress-pill">
                  <span
                    className="belajar-progress-pill-fill"
                    style={{ width: `${progress}%` }}
                  />
                </span>
                <span className="belajar-progress-fraction">
                  {completedItems.length}/{flatItems.length}
                </span>
              </>
            )}
            <span
              className={`belajar-progress-chevron ${showPopover ? "open" : ""}`}>
              ⌄
            </span>
          </button>

          {showPopover && (
            <div className="belajar-popover">
              <p className="belajar-popover-title">
                {progress >= 100
                  ? "Modul sudah selesai"
                  : `${progress}% Modul Telah Selesai`}
              </p>
              <p className="belajar-popover-desc">
                {progress >= 100
                  ? `${completedItems.length} dari ${flatItems.length} modul telah selesai, silahkan download sertifikat`
                  : "Selesaikan Semua Modul Untuk Mendapatkan Sertifikat"}
              </p>
              <button
                type="button"
                className="belajar-popover-btn"
                disabled={progress < 100}
                onClick={() => navigate(`/sertifikat/${id}`)}>
                Ambil Sertifikat
              </button>
            </div>
          )}

          <div className="belajar-profile-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="belajar-avatar-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={FotoNavbar} alt="Akun" className="belajar-avatar" />
            </button>

            <div
              className={`belajar-dropdown-menu ${dropdownOpen ? "open" : ""}`}>
              <Link
                to="/profil"
                className="belajar-dropdown-item"
                onClick={() => setDropdownOpen(false)}>
                Profil Saya
              </Link>
              <Link
                to="/kelas-saya"
                className="belajar-dropdown-item"
                onClick={() => setDropdownOpen(false)}>
                Kelas Saya
              </Link>
              <Link
                to="/pesanan-saya"
                className="belajar-dropdown-item"
                onClick={() => setDropdownOpen(false)}>
                Pesanan Saya
              </Link>
              <button
                type="button"
                className="belajar-dropdown-item belajar-dropdown-logout"
                onClick={handleLogout}>
                Keluar ⏻
              </button>
            </div>
          </div>

          <button
            type="button"
            className="belajar-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <div className={`belajar-menu-mobile ${menuOpen ? "open" : ""}`}>
          <Link
            className="belajar-mobile-link"
            to="/profil"
            onClick={() => setMenuOpen(false)}>
            Profil Saya
          </Link>
          <Link
            className="belajar-mobile-link"
            to="/kelas-saya"
            onClick={() => setMenuOpen(false)}>
            Kelas Saya
          </Link>
          <Link
            className="belajar-mobile-link"
            to="/pesanan-saya"
            onClick={() => setMenuOpen(false)}>
            Pesanan Saya
          </Link>
          <button
            type="button"
            className="belajar-mobile-link belajar-mobile-logout"
            onClick={handleLogout}>
            Keluar ⏻
          </button>
        </div>
      </header>

      <div className="belajar-body">
        <div className="belajar-left">{renderLeftContent()}</div>

        <div className="belajar-navbar">
          <button
            type="button"
            className="belajar-nav-btn"
            disabled={currentIndex <= 0}
            onClick={() => goToItem(currentIndex - 1)}>
            ‹{" "}
            {currentIndex > 0
              ? flatItems[currentIndex - 1].title
              : "Sebelumnya"}
          </button>
          <button
            type="button"
            className="belajar-nav-btn belajar-nav-next"
            disabled={currentIndex >= flatItems.length - 1}
            onClick={() => goToItem(currentIndex + 1)}>
            {currentIndex < flatItems.length - 1
              ? flatItems[currentIndex + 1].title
              : "Selanjutnya"}{" "}
            ›
          </button>
        </div>

        <aside className="belajar-sidebar">
          <ModuleList
            flatItems={flatItems}
            completedItems={completedItems}
            currentItemKey={currentItemKey}
            onSelectItem={setCurrentItemKey}
            onToggleComplete={(key) =>
              saveProgress(key, !completedItems.includes(key))
            }
          />

          <button
            type="button"
            className="belajar-review-bar"
            onClick={handleOpenRating}>
            ☆ Beri Review & Rating
          </button>
        </aside>
      </div>

      {showSubmitModal && (
        <div className="belajar-modal-overlay">
          <div className="belajar-modal-card">
            <div className="belajar-modal-illustration">
              <img
                src={
                  currentItem?.type === "pre-test" ? notifPretest : notifQuiz
                }
                alt="Notifikasi Konfirmasi"
                className="belajar-modal-img"
              />
            </div>
            <h3 className="belajar-modal-title">
              Selesaikan {currentItem?.type === "pre-test" ? "Pretest" : "Quiz"}
            </h3>
            <p className="belajar-modal-desc">
              Apakah kamu yakin untuk menyelesaikan{" "}
              {currentItem?.type === "pre-test" ? "pretest" : "quiz"} ini?
            </p>
            <div className="belajar-modal-actions">
              <button
                type="button"
                className="belajar-modal-btn-cancel"
                onClick={() => setShowSubmitModal(false)}>
                Batal
              </button>
              <button
                type="button"
                className="belajar-modal-btn-confirm"
                onClick={handleFinishTest}>
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
      {showRatingModal && (
        <div className="belajar-modal-overlay">
          <div className="belajar-modal-card">
            <h3 className="belajar-modal-title">Tulis Review Terbaikmu!</h3>
            <p className="belajar-modal-desc">
              Bagikan pengalaman belajarmu di kelas ini untuk membantu peserta
              lain
            </p>

            <div className="belajar-rating-stars-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="belajar-rating-star-btn"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRatingValue(star)}
                  aria-label={`Beri ${star} bintang`}>
                  <span
                    className={`belajar-rating-star ${
                      star <= (hoverRating || ratingValue) ? "filled" : ""
                    }`}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            <textarea
              className="belajar-rating-textarea"
              placeholder="Masukkan Review"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="belajar-modal-actions">
              <button
                type="button"
                className="belajar-modal-btn-cancel"
                onClick={handleCancelRating}>
                Batal
              </button>
              <button
                type="button"
                className="belajar-modal-btn-confirm"
                disabled={ratingValue === 0}
                onClick={handleSubmitReview}>
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BelajarKelas() {
  const { id } = useParams();
  const { course, status, message, setItemCompleted } = useLearningCourse(id);

  if (status === "loading") {
    return <p className="belajar-not-found">Memuat kelas...</p>;
  }

  if (status !== "ready") {
    return (
      <div className="belajar-not-found">
        <p>{message}</p>
        <Link to={`/produk/${id}`}>Lihat detail kelas</Link>
      </div>
    );
  }

  return (
    <BelajarKelasContent
      key={course.id}
      course={course}
      onSetCompleted={setItemCompleted}
    />
  );
}

export default BelajarKelas;
