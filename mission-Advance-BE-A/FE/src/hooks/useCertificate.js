import { useEffect, useState } from "react";
import { sertifikatApi } from "../services/api/kelasSayaApi";

export function useCertificate(productId) {
  const [state, setState] = useState({
    certificate: null,
    status: "loading",
    message: "",
  });

  useEffect(() => {
    let cancelled = false;

    sertifikatApi
      .get(productId)
      .then((certificate) => {
        if (!cancelled) setState({ certificate, status: "ready", message: "" });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({
          certificate: null,
          status: error.response?.status === 404 ? "notFound" : "error",
          message:
            error.response?.data?.message ??
            "Gagal memuat sertifikat. Silakan coba lagi.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return state;
}
