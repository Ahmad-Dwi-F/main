import { create } from "zustand";
import { authService } from "../services/api/serviceApi";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(`user`);

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

export const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem(`token`),
  user: getStoredUser(),

  isDelay: false,
  fail: null,
  clearFail: () => set({ fail: null }),
  login: async (email, password) => {
    set({ isDelay: true, fail: null });

    try {
      const allUsers = await authService.getAllUsers();

      const foundUser = allUsers.find(
        (user) => user.email === email && user.password === password,
      );

      if (foundUser) {
        const mockToken = `token-mockapi-${foundUser.id}`;

        localStorage.setItem(`token`, mockToken);
        localStorage.setItem(`user`, JSON.stringify(foundUser));

        set({
          isLoggedIn: true,
          user: foundUser,
          isDelay: false,
        });

        return { success: true };
      } else {
        set({
          isDelay: false,
          fail: "Akun belum terdaftar atau password salah!",
        });
        return { success: false };
      }
    } catch (error) {
      set({
        isDelay: false,
        fail: "Terjadi kesalahan pada server saat mencoba login.",
      });
      return { success: false, error };
    }
  },

  setLogOut: () => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`user`);

    set({
      isLoggedIn: false,
      user: null,
      fail: null,
    });
  },

  register: async ({ nama, email, jenisKelamin, noHp, password }) => {
    set({ isDelay: true, fail: null });

    try {
      const allUsers = await authService.getAllUsers();

      const emailExists = allUsers.some((user) => user.email === email);
      if (emailExists) {
        set({
          isDelay: false,
          fail: "Email ini sudah terdaftar. Silakan masuk.",
        });
        return { success: false };
      }

      await authService.registerUser({
        nama,
        email,
        jenisKelamin,
        noHp,
        password,
      });

      set({ isDelay: false });
      return { success: true };
    } catch (error) {
      set({
        isDelay: false,
        fail: "Terjadi kesalahan pada server saat mendaftar.",
      });
      return { success: false, error };
    }
  },
}));
