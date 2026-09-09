import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { courses } from "../data/courses";
import HeroProduk from "../components/HeroProduk";
import Footer from "../components/Footer";
import PurchaseCard from "../components/PurchaseCard";
import PersonCard from "../components/PersonCard";
import CourseCurriculum from "../components/CourseCurriculum";
import CourseCard from "../components/CourseCard";
import "./DetailProduk.css";

function DetailProduk() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div>
        <Navbar />
        <p className="detail-not-found">Kelas tidak ditemukan.</p>
      </div>
    );
  }
  const relatedCourses = courses.filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <div>
      <Navbar />

      <nav className="detail-breadcrumb" aria-label="breadcrumb">
        <Link to="/">Beranda</Link>
        <span className="detail-breadcrumb-sep">/</span>
        <span>{course.category || "Kelas"}</span>
        <span className="detail-breadcrumb-sep">/</span>
        <span className="detail-breadcrumb-current">{course.title}</span>
      </nav>

      <HeroProduk />

      <div className="detail-main">
        <div className="detail-left">
          <section className="detail-section">
            <h2 className="detail-section-title">Deskripsi</h2>
            <p className="detail-description-text">
              {course.description || "Deskripsi kelas belum tersedia."}
            </p>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">
              Belajar bersama Tutor Profesional
            </h2>
            <div className="detail-tutor-grid">
              {(course.tutors || []).map((tutor, i) => (
                <PersonCard key={i} {...tutor} />
              ))}
            </div>
          </section>
          <section className="detail-section">
            <h2 className="detail-section-title">Kamu akan Mempelajari</h2>
            <CourseCurriculum curriculum={course.curriculum || []} />
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">Rating dan Review</h2>
            <div className="detail-tutor-grid">
              {(course.reviews || []).map((review, i) => (
                <PersonCard key={i} {...review} />
              ))}
            </div>
          </section>
        </div>

        <aside className="detail-right">
          <PurchaseCard
            id={course.id}
            title={course.title}
            price={course.price}
            originalPrice={course.originalPrice}
            offerText={course.offerText}
            includes={course.includes}
            language={course.language}
          />
        </aside>
      </div>

      <section className="detail-related">
        <h2 className="detail-related-title">
          Video Pembelajaran Terkait Lainnya
        </h2>
        <p className="detail-related-subtitle">
          Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
        </p>

        <div className="detail-related-grid">
          {relatedCourses.map((c) => (
            <CourseCard key={c.id} {...c} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default DetailProduk;
