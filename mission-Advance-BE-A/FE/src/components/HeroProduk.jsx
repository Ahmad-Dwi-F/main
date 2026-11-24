import StarRating from "./StarRating";
import "../components/HeroProduk.css";

function Hero({ rating, reviewCount }) {
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
          rating={rating ?? 0}
          reviewCount={reviewCount ?? 0}
          size="lg"
          className="star-rating-on-dark"
        />
      </div>
    </section>
  );
}

export default Hero;
