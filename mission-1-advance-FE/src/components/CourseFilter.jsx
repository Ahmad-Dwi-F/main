import { useState } from "react";
import "./CourseFilter.css";

const categories = [
  "Semua Kelas",
  "Pemasaran",
  "Desain",
  "Pengembangan Diri",
  "Bisnis",
];

function CourseFilter({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");

  const handleClick = (category) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="course-filter">
      <h2 className="course-filter-title">
        Koleksi Video Pembelajaran Unggulan
      </h2>
      <p className="course-filter-subtitle">
        Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
      </p>

      <div className="course-filter-tabs">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={`course-filter-tab ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleClick(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CourseFilter;
