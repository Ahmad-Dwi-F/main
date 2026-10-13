import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";
import CourseToolbar from "../components/CourseToolbar";
import Pagination from "../components/Pagination";
import { useCourseList } from "../hooks/useCourseList";
import "./Kategori.css";

const CATEGORY_MAP = {
  Pemasaran: "Pemasaran",
  Desain: "Desain",
  "Pengembangan Diri": "Pengembangan Diri",
  "Bisnis Manajemen": "Bisnis",
};

const PRICE_RULES = {
  "Di bawah Rp 500.000": (price) => price < 500000,
  "Rp 500.000 - Rp 1.000.000": (price) => price >= 500000 && price <= 1000000,
  "Di atas Rp 1.000.000": (price) => price > 1000000,
};

function Kategori() {
  const [filters, setFilters] = useState({ checkedItems: {}, duration: null });
  const { courses, loading } = useCourseList();

  const filteredCourses = useMemo(() => {
    const checked = Object.entries(filters.checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([label]) => label);

    const selectedCategories = checked
      .filter((label) => label in CATEGORY_MAP)
      .map((label) => CATEGORY_MAP[label]);

    const selectedPrices = checked.filter((label) => label in PRICE_RULES);

    return courses.filter((course) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      const matchPrice =
        selectedPrices.length === 0 ||
        selectedPrices.some((label) => PRICE_RULES[label](course.price));

      return matchCategory && matchPrice;
    });
  }, [filters, courses]);

  return (
    <div>
      <Navbar />

      <div className="kategori-header">
        <h1>Koleksi Video Pembelajaran Unggulan</h1>
        <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
      </div>

      <div className="kategori-layout">
        <FilterSidebar onFilterChange={setFilters} />
        <div className="kategori-content">
          <CourseToolbar
            onSortChange={(value) => console.log("sort:", value)}
            onSearchChange={(value) => console.log("search:", value)}
          />

          {loading ? (
            <p>Memuat kelas...</p>
          ) : (
            <div className="kategori-course-grid">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          )}

          <Pagination
            totalPages={6}
            onPageChange={(page) => console.log("page:", page)}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Kategori;
