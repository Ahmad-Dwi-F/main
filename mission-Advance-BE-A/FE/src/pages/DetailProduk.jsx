import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroProduk from "../components/HeroProduk";
import Footer from "../components/Footer";
import PurchaseCard from "../components/PurchaseCard";
import PersonCard from "../components/PersonCard";
import CourseCurriculum from "../components/CourseCurriculum";
import CourseCard from "../components/CourseCard";
import {
  useCourseDetail,
  COURSE_STATUS_MESSAGE,
} from "../hooks/useCourseDetail";
import { useCourseList } from "../hooks/useCourseList";
import { assetUrl } from "../utils/assetUrl";
import {
  COURSE_DESCRIPTION,
  COURSE_LANGUAGE,
  OFFER_TEXT,
  TUTOR_BIO,
} from "../data/detailContent";
import { useCourseReviews } from "../hooks/useCourseReview";
import "./DetailProduk.css";

function DetailProduk() {
  const { id } = useParams();
  const { course, status } = useCourseDetail(id);
  const { courses } = useCourseList();
  const reviews = useCourseReviews(id);

  if (status !== "ready") {
    return (
      <div>
        <Navbar />
        <p className="detail-not-found">{COURSE_STATUS_MESSAGE[status]}</p>
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

      <HeroProduk rating={course.rating} reviewCount={course.reviewCount} />

      <div className="detail-main">
        <div className="detail-left">
          <section className="detail-section">
            <h2 className="detail-section-title">Deskripsi</h2>
            <p className="detail-description-text">{COURSE_DESCRIPTION}</p>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">
              Belajar bersama Tutor Profesional
            </h2>
            <div className="detail-tutor-grid">
              <PersonCard
                avatar={course.instructor.avatar}
                name={course.instructor.name}
                subtitle={course.instructor.role}
                text={TUTOR_BIO}
              />
            </div>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">Kamu akan Mempelajari</h2>
            <CourseCurriculum curriculum={course.curriculum ?? []} />
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">Rating dan Review</h2>
            {reviews.length === 0 ? (
              <p className="detail-description-text">
                Belum ada ulasan untuk kelas ini.
              </p>
            ) : (
              <div className="detail-tutor-grid">
                {reviews.map((review) => (
                  <PersonCard
                    key={review.id}
                    avatar={assetUrl("pp-profil.png")}
                    name={review.name}
                    subtitle="Peserta kelas"
                    text={review.comment || "Tidak ada komentar."}
                    rating={review.rating}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="detail-right">
          <PurchaseCard
            id={course.id}
            title={course.title}
            price={course.price}
            originalPrice={course.originalPrice}
            offerText={course.isDiscount ? OFFER_TEXT : undefined}
            includes={course.includes}
            language={COURSE_LANGUAGE}
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
