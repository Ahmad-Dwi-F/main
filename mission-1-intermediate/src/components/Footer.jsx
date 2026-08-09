import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";

const footerLinks = {
  Kategori: [
    "Digital & Teknologi",
    "Pemasaran",
    "Manajemen Bisnis",
    "Pengembangan Diri",
    "Desain",
  ],
  Perusahaan: [
    "Tentang Kami",
    "FAQ",
    "Kebijakan Privasi",
    "Ketentuan Layanan",
    "Bantuan",
  ],
  Komunitas: ["Tips Sukses", "Blog"],
};

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="videobelajar" className="footer-logo" />
          <p className="footer-tagline">
            Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
          </p>
          <p className="footer-address">
            Jl. Usman Effendi No. 50 Lowokwaru, Malang
          </p>
          <p className="footer-phone">+62-877-7123-1234</p>
        </div>

        <div className="footer-links">
          {Object.entries(footerLinks).map(([section, items]) => (
            <div className="footer-column" key={section}>
              <button
                type="button"
                className="footer-column-title"
                onClick={() => toggleSection(section)}>
                {section}
                <span
                  className={`footer-chevron ${
                    openSection === section ? "open" : ""
                  }`}>
                  ›
                </span>
              </button>
              <ul
                className={`footer-column-list ${
                  openSection === section ? "open" : ""
                }`}>
                {items.map((item) => (
                  <li key={item}>
                    <NavLink to="#">{item}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copyright">
          @2023 Gerobak Sayur All Rights Reserved.
        </p>
        <div className="footer-socials">
          <a href="#" aria-label="LinkedIn" className="footer-social-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4zM13.5 8.48h-3.8V21h3.8v-6.2c0-1.64.31-3.23 2.35-3.23 2 0 2.02 1.87 2.02 3.34V21H21v-6.85c0-3.46-.75-6.13-4.79-6.13-1.94 0-3.24 1.07-3.77 2.08h-.05z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="footer-social-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.98H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.98A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="footer-social-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.02-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="footer-social-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M23.95 4.57a9.9 9.9 0 0 1-2.83.78 4.94 4.94 0 0 0 2.17-2.73 9.9 9.9 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.38 4.49A13.98 13.98 0 0 1 1.67 3.15a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.83 4.93 4.93 0 0 1-2.21.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.02-.63a10.02 10.02 0 0 0 2.46-2.54z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
