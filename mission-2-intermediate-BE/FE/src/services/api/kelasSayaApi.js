import apiClient from "./apiClient";
import { assetUrl } from "../../utils/assetUrl";
import { CARD_DESC, toCourse } from "./produkApi";

const toMyCourse = (row) => ({
  course: {
    id: row.id,
    title: row.title,
    desc: CARD_DESC,
    image: assetUrl(row.image),
    instructor: {
      name: row.instructorName,
      role: row.instructorRole,
      avatar: assetUrl(row.instructorAvatar),
    },
  },
  progress: row.progress,
  moduleCount: row.moduleCount,
  totalMinutes: row.totalMinutes,
  completedCount: row.completedCount,
});

export const kelasSayaApi = {
  getAll: () =>
    apiClient.get("/kelas-saya").then((res) => res.data.map(toMyCourse)),

  getOne: (productId) =>
    apiClient.get(`/kelas-saya/${productId}`).then((res) => ({
      ...toCourse(res.data),
      progress: res.data.progress,
      completedIds: res.data.completedIds,
    })),

  setCompleted: (productId, materialId, completed) =>
    apiClient[completed ? "put" : "delete"](
      `/kelas-saya/${productId}/materi/${materialId}`,
    ).then((res) => res.data),
};

export const sertifikatApi = {
  get: (productId) =>
    apiClient.get(`/sertifikat/${productId}`).then((res) => res.data),
};
