import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";
import CourseToolbar from "../components/CourseToolbar";
import Pagination from "../components/Pagination";
import { useCourseList } from "../hooks/useCourseList";
import { useCategoryList } from "../hooks/useCategoryList";
import { useDebounce } from "../hooks/useDebounce";
import "./Kategori.css";

const PAGE_SIZE = 9;

const CATEGORY_MAP = {
  Pemasaran: "Pemasaran",
  Desain: "Desain",
  "Pengembangan Diri": "Pengembangan Diri",
  "Bisnis Manajemen": "Bisnis",
};

const PRICE_RANGES = {
  "Di bawah Rp 500.000": { min: 0, max: 499999 },
  "Rp 500.000 - Rp 1.000.000": { min: 500000, max: 1000000 },
  "Di atas Rp 1.000.000": { min: 1000001, max: Infinity },
};

const SORT_PARAMS = {
  "harga-rendah": { sort: "price", order: "asc" },
  "harga-tinggi": { sort: "price", order: "desc" },
  "a-z": { sort: "title", order: "asc" },
  "z-a": { sort: "title", order: "desc" },
  "rating-tertinggi": { sort: "rating", order: "desc" },
  "rating-terendah": { sort: "rating", order: "asc" },
};

function mergeRanges(ranges) {
  const merged = [];
  for (const range of [...ranges].sort((a, b) => a.min - b.min)) {
    const last = merged[merged.length - 1];
    if (last && range.min <= last.max + 1) {
      last.max = Math.max(last.max, range.max);
    } else {
      merged.push({ ...range });
    }
  }
  return merged;
}

function Kategori() {
  const [filters, setFilters] = useState({ checkedItems: {} });
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [page, setPage] = useState(1);
  const [prevKeyword, setPrevKeyword] = useState("");

  const keyword = useDebounce(search.trim(), 400);
  const { categories } = useCategoryList();

  // Reset halaman ke 1 saat hasil debounce keyword berubah (pola resmi React saat render)
  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword);
    setPage(1);
  }

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handleSortChange = (nextSortKey) => {
    setSortKey(nextSortKey);
    setPage(1);
  };

  const selected = useMemo(() => {
    const labels = Object.entries(filters.checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([label]) => label);

    const categoryIds = labels
      .filter((label) => label in CATEGORY_MAP)
      .map((label) => {
        const targetName = CATEGORY_MAP[label].trim().toLowerCase();
        return categories.find(
          (c) => c.name?.trim().toLowerCase() === targetName,
        )?.id;
      })
      .filter((id) => id !== undefined && id !== null);

    const ranges = mergeRanges(
      labels
        .filter((label) => label in PRICE_RANGES)
        .map((label) => PRICE_RANGES[label]),
    );

    return { categoryIds, ranges };
  }, [filters, categories]);

  const singleRange = selected.ranges.length === 1 ? selected.ranges[0] : null;
  const sortConfig = SORT_PARAMS[sortKey] ?? {};

  const queryParams = useMemo(
    () => ({
      kategori:
        selected.categoryIds.length > 0
          ? selected.categoryIds.join(",")
          : undefined,
      hargaMin:
        singleRange && singleRange.min > 0 ? singleRange.min : undefined,
      hargaMax:
        singleRange && Number.isFinite(singleRange.max)
          ? singleRange.max
          : undefined,
      q: keyword || undefined,
      sort: sortConfig.sort,
      order: sortConfig.order,
    }),
    [selected, singleRange, keyword, sortConfig.sort, sortConfig.order],
  );

  const { courses, loading, error } = useCourseList(queryParams);

  const visibleCourses = useMemo(() => {
    if (selected.ranges.length <= 1) return courses;
    return courses.filter((course) =>
      selected.ranges.some(
        (range) =>
          Number(course.price) >= range.min &&
          Number(course.price) <= range.max,
      ),
    );
  }, [courses, selected.ranges]);

  const totalPages = Math.max(1, Math.ceil(visibleCourses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return visibleCourses.slice(startIndex, startIndex + PAGE_SIZE);
  }, [visibleCourses, currentPage]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    document
      .querySelector(".kategori-layout")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let content;
  if (loading) {
    content = <p>Memuat kelas...</p>;
  } else if (error) {
    content = <p>Gagal memuat kelas. Silakan coba lagi.</p>;
  } else if (paginatedCourses.length === 0) {
    content = (
      <p>
        Tidak ada kelas yang cocok dengan pencarian dan filter yang dipilih.
      </p>
    );
  } else {
    content = (
      <div className="kategori-course-grid">
        {paginatedCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="kategori-header">
        <h1>Koleksi Video Pembelajaran Unggulan</h1>
        <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
      </div>

      <div className="kategori-layout">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <div className="kategori-content">
          <CourseToolbar
            onSortChange={handleSortChange}
            onSearchChange={setSearch}
          />

          {content}

          {!loading && !error && visibleCourses.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Kategori;
