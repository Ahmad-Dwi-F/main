import { useEffect, useState } from "react";
import { kelasSayaApi } from "../services/api/kelasSayaApi";

export function useLearningCourse(productId) {
  const [state, setState] = useState({
    data: null,
    status: "loading",
    message: "",
  });

  useEffect(() => {
    let cancelled = false;

    kelasSayaApi
      .getOne(productId)
      .then((data) => {
        if (!cancelled) setState({ data, status: "ready", message: "" });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({
          data: null,
          status: error.response?.status === 404 ? "notFound" : "error",
          message:
            error.response?.data?.message ??
            "Gagal memuat kelas. Silakan coba lagi.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const setItemCompleted = async (materialId, completed) => {
    const { progress, completedIds } = await kelasSayaApi.setCompleted(
      productId,
      materialId,
      completed,
    );
    setState((prev) =>
      prev.data
        ? { ...prev, data: { ...prev.data, progress, completedIds } }
        : prev,
    );
  };

  return {
    course: state.data,
    status: state.status,
    message: state.message,
    setItemCompleted,
  };
}
