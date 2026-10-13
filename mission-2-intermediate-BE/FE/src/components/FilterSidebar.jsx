import { useState } from "react";
import "./FilterSidebar.css";

const checkboxGroups = [
  {
    title: "Bidang Studi",
    items: ["Pemasaran", "Desain", "Pengembangan Diri", "Bisnis Manajemen"],
  },
  {
    title: "Harga",
    items: [
      "Di bawah Rp 500.000",
      "Rp 500.000 - Rp 1.000.000",
      "Di atas Rp 1.000.000",
    ],
  },
];

const durationOptions = ["Kurang dari 4 Jam", "4 - 8 Jam", "Lebih dari 8 Jam"];

function FilterSidebar({ onFilterChange }) {
  const [openSections, setOpenSections] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedDuration, setSelectedDuration] = useState(null);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleCheckboxChange = (item) => {
    const updated = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(updated);
    onFilterChange?.({ checkedItems: updated, duration: selectedDuration });
  };

  const handleDurationChange = (option) => {
    setSelectedDuration(option);
    onFilterChange?.({ checkedItems, duration: option });
  };

  const handleReset = () => {
    setCheckedItems({});
    setSelectedDuration(null);
    onFilterChange?.({ checkedItems: {}, duration: null });
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button type="button" className="filter-reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      {checkboxGroups.map((group) => (
        <div className="filter-group" key={group.title}>
          <button
            type="button"
            className="filter-group-title"
            onClick={() => toggleSection(group.title)}>
            <span className="filter-group-label">
              <span className="filter-icon filter-icon-check">✓</span>
              {group.title}
            </span>
            <span
              className={`filter-chevron ${
                openSections.includes(group.title) ? "open" : ""
              }`}>
              ›
            </span>
          </button>

          <ul
            className={`filter-group-list ${
              openSections.includes(group.title) ? "open" : ""
            }`}>
            {group.items.map((item) => (
              <li key={item}>
                <label className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item]}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="filter-group">
        <button
          type="button"
          className="filter-group-title"
          onClick={() => toggleSection("Durasi")}>
          <span className="filter-group-label">
            <span className="filter-icon filter-icon-duration" />
            Durasi
          </span>
          <span
            className={`filter-chevron ${
              openSections.includes("Durasi") ? "open" : ""
            }`}>
            ›
          </span>
        </button>

        <ul
          className={`filter-group-list ${
            openSections.includes("Durasi") ? "open" : ""
          }`}>
          {durationOptions.map((option) => (
            <li key={option}>
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="durasi"
                  checked={selectedDuration === option}
                  onChange={() => handleDurationChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default FilterSidebar;
