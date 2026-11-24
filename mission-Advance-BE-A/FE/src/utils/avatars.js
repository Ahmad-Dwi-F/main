import ppProfil from "../assets/pp-profil.png";

const PUBLIC_PHOTOS = Array.from({ length: 8 }, (_, i) => `foto${i + 1}.jpg`);

export const AVATAR_KEYS = ["pp-profil.png", ...PUBLIC_PHOTOS];

export const avatarUrl = (key) =>
  PUBLIC_PHOTOS.includes(key) ? `/${key}` : ppProfil;
