import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";
import CourseToolbar from "../components/CourseToolbar";
import Pagination from "../components/Pagination";
import { courses } from "../data/courses";
import "./Kategori.css";

function Kategori() {
  return (
    <div>
      <Navbar />

      <div className="kategori-header">
        <h1>Koleksi Video Pembelajaran Unggulan</h1>
        <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
      </div>

      <div className="kategori-layout">
        <FilterSidebar />
        <div className="kategori-content">
          <CourseToolbar
            onSortChange={(value) => console.log("sort:", value)}
            onSearchChange={(value) => console.log("search:", value)}
          />
          <div className="kategori-course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
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
