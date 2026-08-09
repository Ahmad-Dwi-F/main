import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Wanita");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    setError("");
    console.log("Register:", { fullName, email, gender, phone, password });
    navigate("/login");
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <img src={logo} alt="videobelajar" className="register-logo" />
      </header>

      <div className="register-wrapper">
        <div className="register-card">
          <h1 className="register-title">Pendaftaran Akun</h1>
          <p className="register-subtitle">
            Yuk, daftarkan akunmu sekarang juga!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="fullName">
                Nama Lengkap <span className="register-required">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="email">
                E-Mail <span className="register-required">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="gender">
                Jenis Kelamin <span className="register-required">*</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value="Wanita">Wanita</option>
                <option value="Pria">Pria</option>
              </select>
            </div>

            <div className="register-field">
              <label htmlFor="phone">
                No. Hp <span className="register-required">*</span>
              </label>
              <div className="register-phone-group">
                <div className="register-phone-code">
                  <svg className="register-flag" viewBox="0 0 36 24">
                    <rect width="36" height="12" fill="#e70011" />
                    <rect y="12" width="36" height="12" fill="#ffffff" />
                  </svg>
                  +62
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="password">
                Kata Sandi <span className="register-required">*</span>
              </label>
              <div className="register-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }>
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 5.1A9.9 9.9 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 4.1M6.5 6.5A16.7 16.7 0 002 12s3.5 7 10 7c1.4 0 2.7-.3 3.9-.8" />
                      <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">
                Konfirmasi Kata Sandi{" "}
                <span className="register-required">*</span>
              </label>
              <div className="register-password-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }>
                  {showConfirmPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 5.1A9.9 9.9 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 4.1M6.5 6.5A16.7 16.7 0 002 12s3.5 7 10 7c1.4 0 2.7-.3 3.9-.8" />
                      <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="register-error">{error}</p>}

            <a href="#" className="register-forgot">
              Lupa Password?
            </a>

            <button type="submit" className="register-btn-submit">
              Daftar
            </button>
          </form>

          <Link to="/login" className="register-btn-login">
            Masuk
          </Link>

          <div className="register-divider">
            <span>atau</span>
          </div>

          <button type="button" className="register-btn-google">
            <svg className="register-google-icon" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.8 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 6 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 6 29.7 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.6 0 10.6-2.1 14.5-5.7l-6.7-5.5C29.7 34.6 27 35.5 24 35.5c-5.3 0-9.8-3.6-11.4-8.4l-6.7 5.2C9.5 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1 3-3.2 5.4-6.1 7l6.7 5.5C39.4 37.4 44 31.4 44 24c0-1.2-.1-2.4-.4-3.5z"
              />
            </svg>
            Daftar dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
