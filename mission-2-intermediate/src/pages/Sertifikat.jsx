import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import StarRating from "../components/StarRating";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import certificateImg from "../assets/new-sertifikat.png";
import "./Sertifikat.css";

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

function Sertifikat() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <p className="sertifikat-not-found">Kelas tidak ditemukan.</p>;
  }

  return (
    <div className="sertifikat-page">
      <Navbar />

      <div className="sertifikat-breadcrumb">
        <Link to="/">Beranda</Link> / <span>{course.title}</span> /{" "}
        <span>Sertifikat</span>
      </div>

      <div className="sertifikat-card">
        <div className="sertifikat-img-wrap">
          <img
            src={certificateImg}
            alt="Sertifikat Kelulusan"
            className="sertifikat-img"
          />
        </div>

        <div className="sertifikat-info">
          <div className="sertifikat-info-text">
            <h2 className="sertifikat-title">{course.title}</h2>
            <p className="sertifikat-desc">{course.desc}</p>

            <div className="sertifikat-instructor-row">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="sertifikat-instructor-avatar"
              />
              <div>
                <p className="sertifikat-instructor-name">
                  {course.instructor.name}
                </p>
                <p className="sertifikat-instructor-role">
                  {course.instructor.role}
                </p>
              </div>
            </div>

            <div className="sertifikat-rating-row">
              <StarRating rating={course.rating} size="sm" />
              <span className="sertifikat-rating-value">
                {course.rating} ({course.reviewCount})
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sertifikat-download-btn"
            onClick={() => console.log("Download sertifikat:", course.id)}>
            <DownloadIcon />
            Download Sertifikat
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Sertifikat;
