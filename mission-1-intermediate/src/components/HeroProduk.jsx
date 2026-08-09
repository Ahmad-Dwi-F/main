import StarRating from "./StarRating";
import { courses } from "../data/courses";
import "../components/HeroProduk.css";
import { useParams } from "react-router-dom";

function Hero() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  return (
    <section className="hero-produk">
      <div className="hero-content-produk">
        <h1>
          Gapai karier impianmu sebagai Seorang UI/UX designer & product
          manager.
        </h1>
        <p>
          Belajar bersama tutor profesional di Video Course.
          <br /> kapanpun, di manapun.
        </p>
        <StarRating
          rating={course.rating}
          reviewCount={course.reviewCount}
          size="lg"
          className="star-rating-on-dark"
        />
      </div>
    </section>
  );
}

export default Hero;
