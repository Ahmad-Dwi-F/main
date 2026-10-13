import { useEffect, useState } from "react";
import { produkApi } from "../services/api/produkApi";

export function useCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    produkApi
      .getAll()
      .then((data) => {
        if (!cancelled) setCourses(data);
      })
      .catch((error) => console.error("Gagal memuat produk", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { courses, loading };
}
