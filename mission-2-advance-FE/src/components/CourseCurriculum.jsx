import { useState } from "react";
import "./CourseCurriculum.css";

function CourseCurriculum({ curriculum }) {
  const [openSections, setOpenSections] = useState(
    curriculum.length > 0 ? [curriculum[0].id] : [],
  );

  const toggleSection = (id) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <div className="curriculum">
      {curriculum.map((group) => (
        <div className="curriculum-group" key={group.id}>
          <button
            type="button"
            className="curriculum-group-title"
            onClick={() => toggleSection(group.id)}>
            {group.title}
            <span
              className={`curriculum-chevron ${
                openSections.includes(group.id) ? "open" : ""
              }`}>
              ⌄
            </span>
          </button>

          <div
            className={`curriculum-group-items ${
              openSections.includes(group.id) ? "open" : ""
            }`}>
            {group.items.map((item, i) => (
              <div className="curriculum-item" key={i}>
                <span className="curriculum-item-title">{item.title}</span>
                <div className="curriculum-item-meta">
                  <span className="curriculum-item-video">▶ Video</span>
                  <span className="curriculum-item-duration">
                    🕐 {item.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseCurriculum;
