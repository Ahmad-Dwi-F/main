import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { avatarUrl } from "../utils/avatars";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, setLogOut, user } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setLogOut();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img src={logo} alt="videobelajar" className="navbar-logo" />
        </Link>
        <div className="navbar-menu-desktop">
          <NavLink to="/kategori" className="nav-btn">
            Kategori
          </NavLink>
          {isLoggedIn ? (
            <div className="navbar-profile" ref={dropdownRef}>
              <button
                type="button"
                className="navbar-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  src={avatarUrl(user?.avatar)}
                  alt="foto profil"
                  className="navbar-avatar"
                />
              </button>

              <div className={`navbar-dropdown ${dropdownOpen ? "open" : ""}`}>
                <NavLink
                  to="/"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}>
                  Beranda
                </NavLink>

                <NavLink
                  to="/profil"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}>
                  Profil Saya
                </NavLink>
                <NavLink
                  to="/kelas-saya"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}>
                  Kelas Saya
                </NavLink>
                <NavLink
                  to="/pesanan-saya"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}>
                  Pesanan Saya
                </NavLink>
                <NavLink
                  to="/dashboard-tutor"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}>
                  Dashboard Tutor
                </NavLink>
                <button
                  type="button"
                  className="navbar-dropdown-item navbar-dropdown-logout"
                  onClick={handleLogout}>
                  Keluar ⏻
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn-outline nav-btn-login">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn-fill-register nav-btn-register">
                Register
              </NavLink>
            </>
          )}
        </div>
        <button
          type="button"
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}>
          {" "}
          ☰
        </button>
        <div className={`navbar-menu-mobile ${menuOpen ? "open" : ""}`}>
          <NavLink
            className="mobile-link"
            to="/"
            onClick={() => setMenuOpen(false)}>
            Beranda
          </NavLink>
          <NavLink
            className="mobile-link"
            to="/kategori"
            onClick={() => setMenuOpen(false)}>
            Kategori
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                className="mobile-link"
                to="/profil"
                onClick={() => setMenuOpen(false)}>
                Profil Saya
              </NavLink>
              <NavLink
                className="mobile-link"
                to="/kelas-saya"
                onClick={() => setMenuOpen(false)}>
                Kelas Saya
              </NavLink>
              <NavLink
                className="mobile-link"
                to="/pesanan-saya"
                onClick={() => setMenuOpen(false)}>
                Pesanan Saya
              </NavLink>
              <NavLink
                className="mobile-link"
                to="/dashboard-tutor"
                onClick={() => setMenuOpen(false)}>
                Dashboard Tutor
              </NavLink>
              <button
                type="button"
                className="mobile-link mobile-link-logout"
                onClick={handleLogout}>
                Keluar ⏻
              </button>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <NavLink
                className="btn-fill mobile-btn"
                to="/login"
                onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink
                className="mobile-btn mobile-btn-register"
                to="/register"
                onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
