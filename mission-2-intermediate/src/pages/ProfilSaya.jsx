import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/atoms/Button";
import profilIcon from "../assets/profil-icon.png";
import kelasIcon from "../assets/kelas-icon.png";
import pesananIcon from "../assets/pesanan-icon.png";
import ppProfil from "../assets/pp-profil.png";
import "./ProfilSaya.css";

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
}
function ProfilSaya() {
  const [formData, setFormData] = useState({
    nama: "Jennie Ruby Jane",
    email: "rubyjane@gmail.com",
    jenisKelamin: "Perempuan",
    countryCode: "+62",
    noHp: "81234567890",
    password: "howyoulikethat",
    konfirmasiPassword: "howyoulikethat",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Profil berhasil disimpan!");
  };

  const handleDeleteAccount = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("videobelajar_"))
      .forEach((key) => localStorage.removeItem(key));
    window.location.href = "/";
  };
  return (
    <div>
      <Navbar />

      <div className="profil-header">
        <h1>Ubah Profil</h1>
        <p>Ubah data diri Anda</p>
      </div>

      <div className="profil-layout">
        <aside className="profil-sidebar">
          <Link
            to="/profil"
            className="profil-sidebar-item profil-sidebar-item-active">
            <img
              src={profilIcon}
              alt="Profil Saya"
              className="profil-sidebar-icon"
            />
            <span>Profil Saya</span>
          </Link>
          <Link to="/kelas-saya" className="profil-sidebar-item">
            <img
              src={kelasIcon}
              alt="Kelas Saya"
              className="profil-sidebar-icon"
            />
            <span>Kelas Saya</span>
          </Link>
          <Link to="/pesanan-saya" className="profil-sidebar-item">
            <img
              src={pesananIcon}
              alt="Pesanan Saya"
              className="profil-sidebar-icon"
            />
            <span>Pesanan Saya</span>
          </Link>
        </aside>

        <div className="profil-content">
          <div className="profil-card">
            <div className="profil-info-section">
              <img src={ppProfil} alt="Profile" className="profil-avatar" />
              <div className="profil-details">
                <h2>{formData.nama}</h2>
                <p>{formData.email}</p>
                <button type="button" className="btn-ganti-foto">
                  Ganti Foto Profil
                </button>
              </div>
            </div>

            <form onSubmit={handleSimpan}>
              <div className="profil-form-grid">
                <div className="form-group active">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>E-Mail</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Jenis Kelamin</label>
                  <select
                    name="jenisKelamin"
                    className="form-control"
                    value={formData.jenisKelamin}
                    onChange={handleChange}>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="phone-group">
                  <div className="form-group phone-code">
                    <select
                      name="countryCode"
                      className="form-control"
                      value={formData.countryCode}
                      onChange={handleChange}>
                      <option value="+62">+62</option>
                    </select>
                  </div>
                  <div className="form-group phone-number">
                    <label>No. Hp</label>
                    <input
                      type="tel"
                      name="noHp"
                      className="form-control"
                      value={formData.noHp}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                <div className="form-group">
                  <label>Konfirmasi Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="konfirmasiPassword"
                    className="form-control"
                    value={formData.konfirmasiPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="profil-actions">
                <Button variant="primary" type="submit" className="btn-simpan">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
          <div className="profil-danger-zone">
            <div>
              <h3 className="profil-danger-title">Hapus Akun</h3>
              <p className="profil-danger-desc">
                Setelah akun dihapus, seluruh data profil, pesanan, dan kelas
                yang kamu ikuti akan hilang permanen dan tidak bisa
                dikembalikan.
              </p>
            </div>
            <button
              type="button"
              className="profil-danger-btn"
              onClick={() => setShowDeleteModal(true)}>
              Hapus Akun
            </button>
          </div>

          {showDeleteModal && (
            <div className="profil-modal-overlay">
              <div className="profil-modal-card">
                <h3 className="profil-modal-title">Yakin Hapus Akun?</h3>
                <p className="profil-modal-desc">
                  Tindakan ini nggak bisa dibatalkan. Semua data akun kamu akan
                  dihapus permanen dari perangkat ini.
                </p>
                <div className="profil-modal-actions">
                  <button
                    type="button"
                    className="profil-modal-btn-cancel"
                    onClick={() => setShowDeleteModal(false)}>
                    Batal
                  </button>
                  <button
                    type="button"
                    className="profil-modal-btn-confirm-danger"
                    onClick={handleDeleteAccount}>
                    Ya, Hapus Akun
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilSaya;
