import { useEffect, useState } from "react";
import { kelasSayaApi } from "../services/api/kelasSayaApi";

export function useMyCourseList() {
  const [state, setState] = useState({ items: [], status: "loading" });

  useEffect(() => {
    let cancelled = false;

    kelasSayaApi
      .getAll()
      .then((items) => {
        if (!cancelled) setState({ items, status: "ready" });
      })
      .catch(() => {
        if (!cancelled) setState({ items: [], status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
