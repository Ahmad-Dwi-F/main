import { useEffect, useState } from "react";
import { produkApi } from "../services/api/produkApi";

export function useCourseList(params = {}) {
  const [state, setState] = useState({
    courses: [],
    loading: true,
    error: false,
  });

  const paramKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    produkApi
      .getAll(JSON.parse(paramKey))
      .then((courses) => {
        if (!cancelled) setState({ courses, loading: false, error: false });
      })
      .catch((error) => {
        console.error("Gagal memuat produk", error);
        if (!cancelled) setState({ courses: [], loading: false, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [paramKey]);

  return state;
}
