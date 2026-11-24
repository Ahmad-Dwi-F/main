import apiClient from "./apiClient";
import { assetUrl } from "../../utils/assetUrl";

export const CARD_DESC =
  "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...";

export const toCourse = (p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  desc: CARD_DESC,
  image: assetUrl(p.image),
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount,
  isDiscount: Boolean(p.isDiscount),
  rating: p.rating,
  reviewCount: p.reviewCount,
  includes: p.includes,
  curriculum: p.curriculum,
  instructor: {
    name: p.instructorName,
    role: p.instructorRole,
    avatar: assetUrl(p.instructorAvatar ?? "pp-profil.png"),
  },
});

const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, val]) => val !== undefined && val !== null && val !== "",
    ),
  );

export const produkApi = {
  getAll: (params = {}) =>
    apiClient
      .get("/produk", { params: cleanParams(params) })
      .then((res) => res.data.map(toCourse)),
  getById: (id) =>
    apiClient.get(`/produk/${id}`).then((res) => toCourse(res.data)),
};

export const kategoriApi = {
  getAll: () => apiClient.get("/kategori").then((res) => res.data),
};
