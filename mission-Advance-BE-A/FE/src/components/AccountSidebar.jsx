import { NavLink } from "react-router-dom";
import profilIcon from "../assets/profil-icon.png";
import kelasIcon from "../assets/kelas-icon.png";
import pesananIcon from "../assets/pesanan-icon.png";
import "./AccountSidebar.css";

const ITEMS = [
  { to: "/profil", label: "Profil Saya", icon: profilIcon },
  { to: "/kelas-saya", label: "Kelas Saya", icon: kelasIcon },
  { to: "/pesanan-saya", label: "Pesanan Saya", icon: pesananIcon },
  { to: "/dashboard-tutor", label: "Dashboard Tutor", icon: profilIcon },
];

function AccountSidebar() {
  return (
    <aside className="account-sidebar">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => {
            const isTutorActive = isActive && item.to === "/dashboard-tutor";
            return [
              "account-sidebar-item",
              isActive ? "account-sidebar-item-active" : "",
              isTutorActive ? "account-sidebar-item-tutor-active" : "",
            ]
              .filter(Boolean)
              .join(" ");
          }}>
          <img src={item.icon} alt="" className="account-sidebar-icon" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}

export default AccountSidebar;
