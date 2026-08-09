import "./CourseIncludes.css";

const icons = {
  exam: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  ),
  video: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l6-3v10l-6-3z" />
    </svg>
  ),
  doc: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  ),
  certificate: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L7 21l5-2.5L17 21l-2-7.5" />
    </svg>
  ),
  pretest: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 12l3 3-5 2 2-5z" />
    </svg>
  ),
  globe: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </svg>
  ),
};

function CourseIncludes({ includes, language }) {
  return (
    <>
      {includes && includes.length > 0 && (
        <div className="course-includes-block">
          <p className="course-includes-title">Kelas Ini Sudah Termasuk</p>
          <div className="course-includes-grid">
            {includes.map((item) => (
              <div className="course-includes-item" key={item.label}>
                <span className="course-includes-icon">{icons[item.icon]}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {language && (
        <div className="course-includes-block">
          <p className="course-includes-title">Bahasa Pengantar</p>
          <div className="course-includes-item">
            <span className="course-includes-icon">{icons.globe}</span>
            <span>{language}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseIncludes;
