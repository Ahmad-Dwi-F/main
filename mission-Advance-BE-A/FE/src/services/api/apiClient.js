import axios from "axios";

const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_URL });

let onUnauthorized = () => {};
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      onUnauthorized();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
