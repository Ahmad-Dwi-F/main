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

function FilterSidebar({ onFilterChange }) {
  const [openSections, setOpenSections] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleCheckboxChange = (item) => {
    const updated = {
      ...checkedItems,
      [item]: !checkedItems[item],
    };
    setCheckedItems(updated);
    onFilterChange?.({ checkedItems: updated });
  };

  const handleReset = () => {
    const empty = {};
    setCheckedItems(empty);
    onFilterChange?.({ checkedItems: empty });
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
                    checked={Boolean(checkedItems[item])}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default FilterSidebar;
