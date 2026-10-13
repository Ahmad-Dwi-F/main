import { useEffect, useState } from "react";
import { reviewApi } from "../services/api/reviewApi";

export function useCourseReviews(productId) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let cancelled = false;

    reviewApi
      .list(productId)
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .catch((error) => console.error("Gagal memuat ulasan", error));

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return reviews;
}
