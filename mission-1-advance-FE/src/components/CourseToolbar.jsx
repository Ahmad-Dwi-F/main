import { useState, useRef, useEffect } from "react";
import "./CourseToolbar.css";

const sortOptions = [
  { value: "harga-rendah", label: "Harga Rendah" },
  { value: "harga-tinggi", label: "Harga Tinggi" },
  { value: "a-z", label: "A to Z" },
  { value: "z-a", label: "Z to A" },
  { value: "rating-tertinggi", label: "Rating Tertinggi" },
  { value: "rating-terendah", label: "Rating Terendah" },
];

function CourseToolbar({ onSortChange, onSearchChange }) {
  const [sortValue, setSortValue] = useState(sortOptions[0].value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSortValue(value);
    setDropdownOpen(false);
    onSortChange?.(value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearchChange?.(e.target.value);
  };

  return (
    <div className="course-toolbar">
      <div className="course-toolbar-sort" ref={dropdownRef}>
        <button
          type="button"
          className="course-toolbar-sort-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}>
          Urutkan
          <span
            className={`course-toolbar-chevron ${dropdownOpen ? "open" : ""}`}></span>
        </button>

        <div
          className={`course-toolbar-dropdown ${dropdownOpen ? "open" : ""}`}>
          {sortOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`course-toolbar-dropdown-item ${
                sortValue === option.value ? "active" : ""
              }`}
              onClick={() => handleSelect(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="course-toolbar-search">
        <input
          type="text"
          placeholder="Cari Kelas"
          value={searchValue}
          onChange={handleSearchChange}
          className="course-toolbar-search-input"
        />
        <span className="course-toolbar-search-icon">🔍</span>
      </div>
    </div>
  );
}

export default CourseToolbar;
