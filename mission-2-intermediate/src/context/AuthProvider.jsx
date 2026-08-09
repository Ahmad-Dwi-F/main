import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { findAccountByEmail } from "../utils/accountStorage";
import { hashPassword } from "../utils/hashPassword";

const STORAGE_KEY = "videobelajar_auth";
const CURRENT_USER_KEY = "videobelajar_current_user";

function loadAuthState() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function loadCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(loadAuthState);
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const account = findAccountByEmail(email);
    if (!account) {
      return { success: false, message: "Email belum terdaftar." };
    }

    const hashedInput = await hashPassword(password);
    if (hashedInput !== account.passwordHash) {
      return { success: false, message: "Kata sandi salah." };
    }

    setCurrentUser({ nama: account.nama, email: account.email });
    setIsLoggedIn(true);
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
