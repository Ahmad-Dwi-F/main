import { create } from "zustand";
import { authApi } from "../services/api/authApi";
import { setUnauthorizedHandler } from "../services/api/apiClient";
import store from "../rtk/store";
import { resetOrders } from "../rtk/feature/order/orderSlice";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser || storedUser === "undefined") {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user:", error);
    return null;
  }
};

const getErrorMessage = (error, fallback) => {
  if (!error.response) return "Tidak dapat terhubung ke server.";
  return error.response.data?.message ?? fallback;
};

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  store.dispatch(resetOrders());
};

export const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  user: getStoredUser(),

  isDelay: false,
  fail: null,
  clearFail: () => set({ fail: null }),

  login: async (email, password) => {
    set({ isDelay: true, fail: null });

    try {
      const { token, user } = await authApi.login({ email, password });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ isLoggedIn: true, user, isDelay: false });

      return { success: true };
    } catch (error) {
      set({
        isDelay: false,
        fail: getErrorMessage(
          error,
          "Terjadi kesalahan pada server saat mencoba login.",
        ),
      });
      return { success: false };
    }
  },

  register: async (data) => {
    set({ isDelay: true, fail: null });

    try {
      await authApi.register(data);
      set({ isDelay: false });
      return { success: true };
    } catch (error) {
      set({
        isDelay: false,
        fail: getErrorMessage(
          error,
          "Terjadi kesalahan pada server saat mendaftar.",
        ),
      });
      return { success: false };
    }
  },

  updateProfile: async (data) => {
    try {
      const user = await authApi.updateProfile(data);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Gagal menyimpan profil."),
      };
    }
  },

  deleteAccount: async () => {
    try {
      await authApi.deleteAccount();
      clearSession();
      set({ isLoggedIn: false, user: null, fail: null });
      return { success: true };
    } catch (error) {
      console.error("Gagal menghapus akun:", error);
      return { success: false };
    }
  },

  setLogOut: () => {
    clearSession();
    set({ isLoggedIn: false, user: null, fail: null });
  },
}));

setUnauthorizedHandler(() => useAuthStore.getState().setLogOut());
