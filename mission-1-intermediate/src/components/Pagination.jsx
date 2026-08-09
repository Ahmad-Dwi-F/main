import { useState } from "react";
import "./Pagination.css";

function Pagination({ totalPages = 6, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Halaman sebelumnya">
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination-page ${currentPage === page ? "active" : ""}`}
          onClick={() => goToPage(page)}>
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Halaman berikutnya">
        ›
      </button>
    </div>
  );
}

export default Pagination;
