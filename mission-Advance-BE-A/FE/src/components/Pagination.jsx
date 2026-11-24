import { useState } from "react";
import "./Pagination.css";

function Pagination({
  currentPage: controlledPage,
  totalPages = 1,
  onPageChange,
}) {
  const [internalPage, setInternalPage] = useState(1);

  const isControlled = typeof controlledPage === "number";
  const activePage = isControlled ? controlledPage : internalPage;
  const safeCurrentPage = Math.min(
    Math.max(activePage, 1),
    Math.max(totalPages, 1),
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    if (!isControlled) {
      setInternalPage(page);
    }
    onPageChange?.(page);
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => goToPage(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
        aria-label="Halaman sebelumnya">
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination-page ${safeCurrentPage === page ? "active" : ""}`}
          onClick={() => goToPage(page)}>
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => goToPage(safeCurrentPage + 1)}
        disabled={safeCurrentPage === totalPages}
        aria-label="Halaman berikutnya">
        ›
      </button>
    </div>
  );
}

export default Pagination;
