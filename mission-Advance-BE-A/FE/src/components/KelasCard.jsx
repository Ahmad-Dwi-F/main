import { Link, useNavigate } from "react-router-dom";
import "./KelasCard.css";

function KelasCard({
  course,
  progress,
  moduleCount,
  totalMinutes,
  completedCount,
}) {
  const navigate = useNavigate();
  const isComplete = progress >= 100;

  return (
    <div className="kelas-card">
      <div className="kelas-card-header">
        <span>
          {completedCount} / {moduleCount} Modul Terselesaikan
        </span>
        <span
          className={`kelas-status-badge ${isComplete ? "kelas-status-selesai" : "kelas-status-berjalan"}`}>
          {isComplete ? "Selesai" : "Sedang Berjalan"}
        </span>
      </div>

      <div className="kelas-card-body">
        <img
          src={course.image}
          alt={course.title}
          className="kelas-card-image"
        />
        <div className="kelas-card-info">
          <h3 className="kelas-card-title">{course.title}</h3>
          <p className="kelas-card-desc">{course.desc}</p>

          <div className="kelas-card-instructor">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="kelas-card-avatar"
            />
            <div>
              <p className="kelas-card-instructor-name">
                {course.instructor.name}
              </p>
              <p className="kelas-card-instructor-role">
                {course.instructor.role}
              </p>
            </div>
          </div>

          <div className="kelas-card-meta">
            <span>{moduleCount} Modul</span>
            <span>{totalMinutes} Menit</span>
          </div>
        </div>
      </div>

      <div className="kelas-card-footer">
        <div className="kelas-card-progress">
          <span>
            Progres Kelas: <strong>{progress}%</strong>
          </span>
          <div className="kelas-progress-bar">
            <div
              className="kelas-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="kelas-card-actions">
          {isComplete && (
            <button
              type="button"
              className="kelas-btn-outline"
              onClick={() => navigate(`/sertifikat/${course.id}`)}>
              Unduh Sertifikat
            </button>
          )}
          <Link to={`/belajar/${course.id}`} className="kelas-btn-primary">
            {isComplete ? "Lihat Detail Kelas" : "Lanjutkan Pembelajaran"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default KelasCard;
