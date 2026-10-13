import { useState, useMemo } from "react";
import "./ModuleList.css";

function PlayCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5">
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5">
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function PreTest() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 15L11 17L15 13M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002"
        stroke="#222325"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const TYPE_ICONS = {
  video: PlayCircleIcon,
  rangkuman: DocIcon,
  quiz: QuizIcon,
  "pre-test": PreTest,
};

function ModuleList({
  flatItems,
  completedItems,
  currentItemKey,
  onSelectItem,
  onToggleComplete,
}) {
  const sections = useMemo(() => {
    const map = new Map();
    flatItems.forEach((item) => {
      if (!map.has(item.sectionId)) {
        map.set(item.sectionId, {
          id: item.sectionId,
          title: item.sectionTitle,
          items: [],
        });
      }
      map.get(item.sectionId).items.push(item);
    });
    return Array.from(map.values());
  }, [flatItems]);

  const [openSections, setOpenSections] = useState(sections.map((s) => s.id));

  const toggleSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((s) => s !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <div className="modul-list">
      {sections.map((section) => (
        <div className="modul-group" key={section.id}>
          <button
            type="button"
            className="modul-group-title"
            onClick={() => toggleSection(section.id)}>
            {section.title}
            <span
              className={`modul-group-chevron ${openSections.includes(section.id) ? "open" : ""}`}>
              ⌄
            </span>
          </button>

          <div
            className={`modul-group-items ${openSections.includes(section.id) ? "open" : ""}`}>
            {section.items.map((item) => {
              const isDone = completedItems.includes(item.key);
              const isCurrent = item.key === currentItemKey;
              const Icon = TYPE_ICONS[item.type] || PlayCircleIcon;

              return (
                <div
                  key={item.key}
                  className={`modul-item ${isCurrent ? "current" : ""}`}>
                  <button
                    type="button"
                    className={`modul-item-check ${isDone ? "done" : ""}`}
                    onClick={() => onToggleComplete(item.key)}
                    aria-label={
                      isDone ? "Tandai belum selesai" : "Tandai selesai"
                    }>
                    {isDone ? <CheckIcon /> : <Icon />}
                  </button>
                  <button
                    type="button"
                    className="modul-item-body"
                    onClick={() => onSelectItem(item.key)}>
                    <span className="modul-item-title">{item.title}</span>
                    <span className="modul-item-duration">{item.duration}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ModuleList;
