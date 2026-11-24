import { useCallback, useEffect, useState } from "react";
import { tutorSayaApi } from "../services/api/tutorSayaApi";

export function useTutorCourses(params = {}) {
  const [state, setState] = useState({
    courses: [],
    loading: true,
    error: false,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const paramKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    tutorSayaApi
      .listCourses(JSON.parse(paramKey))
      .then((courses) => {
        if (!cancelled) setState({ courses, loading: false, error: false });
      })
      .catch((error) => {
        console.error("Gagal memuat kelas tutor", error);
        if (!cancelled) setState({ courses: [], loading: false, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [paramKey, refreshKey]);

  const reload = useCallback(() => setRefreshKey((n) => n + 1), []);

  return { ...state, reload };
}
