import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");
    const redirectTo = location.state?.from?.pathname ?? "/";
    navigate(redirectTo, { replace: true });
  };
  return (
    <div className="login-page">
      <header className="login-header">
        <img src={logo} alt="videobelajar" className="login-logo" />
      </header>

      <div className="login-wrapper">
        <div className="login-card">
          <h1 className="login-title">Masuk ke Akun</h1>
          <p className="login-subtitle">
            Yuk, lanjutin belajarmu di videobelajar.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">
                E-Mail <span className="login-required">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">
                Kata Sandi <span className="login-required">*</span>
              </label>
              <div className="login-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
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

            {error && <p className="login-error">{error}</p>}

            <a href="#" className="login-forgot">
              Lupa Password?
            </a>

            <button type="submit" className="login-btn-submit">
              Masuk
            </button>
          </form>

          <Link to="/register" className="login-btn-register">
            Daftar
          </Link>

          <div className="login-divider">
            <span>atau</span>
          </div>

          <button type="button" className="login-btn-google">
            <svg className="login-google-icon" viewBox="0 0 48 48">
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
            Masuk dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
