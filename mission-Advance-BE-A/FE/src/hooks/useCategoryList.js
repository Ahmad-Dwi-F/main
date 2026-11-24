import { useEffect, useState } from "react";
import { kategoriApi } from "../services/api/produkApi";

export function useCategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let cancelled = false;

    kategoriApi
      .getAll()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch((error) => console.error("Gagal memuat kategori", error));

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories };
}
