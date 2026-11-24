import apiClient from "./apiClient";

export const tutorSayaApi = {
  getProfile: () => apiClient.get("/tutor-saya").then((res) => res.data),

  saveProfile: (profession) =>
    apiClient.put("/tutor-saya", { profession }).then((res) => res.data),

  uploadImage: (file) => {
    const form = new FormData();
    form.append("image", file);
    return apiClient
      .post("/tutor-saya/gambar", form)
      .then((res) => res.data.image);
  },

  listCourses: (params) =>
    apiClient.get("/tutor-saya/kelas", { params }).then((res) => res.data),

  getCourse: (id) =>
    apiClient.get(`/tutor-saya/kelas/${id}`).then((res) => res.data),

  createCourse: (data) =>
    apiClient.post("/tutor-saya/kelas", data).then((res) => res.data),

  updateCourse: (id, data) =>
    apiClient.patch(`/tutor-saya/kelas/${id}`, data).then((res) => res.data),

  setStatus: (id, status) =>
    apiClient
      .patch(`/tutor-saya/kelas/${id}/status`, { status })
      .then((res) => res.data),

  removeCourse: (id) => apiClient.delete(`/tutor-saya/kelas/${id}`),
};
