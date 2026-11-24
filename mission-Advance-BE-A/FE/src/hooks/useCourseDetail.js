import { useEffect, useState } from "react";
import { produkApi } from "../services/api/produkApi";

export const COURSE_STATUS_MESSAGE = {
  loading: "Memuat kelas...",
  notFound: "Kelas tidak ditemukan.",
  error: "Gagal memuat kelas. Silakan coba lagi.",
};

export function useCourseDetail(id) {
  const [state, setState] = useState({ course: null, status: "loading" });

  useEffect(() => {
    let cancelled = false;

    produkApi
      .getById(id)
      .then((course) => {
        if (!cancelled) setState({ course, status: "ready" });
      })
      .catch((error) => {
        if (cancelled) return;
        const status = error.response?.status === 404 ? "notFound" : "error";
        setState({ course: null, status });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
