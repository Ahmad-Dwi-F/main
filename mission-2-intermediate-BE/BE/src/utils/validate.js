import { HttpError } from "./httpError.js";

export function parseId(value, message = "Data tidak ditemukan.") {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(404, message);
  return id;
}

export function readText(value, label, max, { required = true } = {}) {
  const kosong = value === undefined || value === null || value === "";
  if (kosong) {
    if (required) throw new HttpError(400, `${label} wajib diisi.`);
    return null;
  }
  if (typeof value !== "string") {
    throw new HttpError(400, `${label} harus berupa teks.`);
  }

  const text = value.trim();
  if (!text) {
    if (required) throw new HttpError(400, `${label} wajib diisi.`);
    return null;
  }
  if (text.length > max) {
    throw new HttpError(400, `${label} maksimal ${max} karakter.`);
  }
  return text;
}

export function readNumber(value, label, { min, max, integer = false }) {
  const bisaDiubah =
    typeof value === "number" ||
    (typeof value === "string" && value.trim() !== "");
  const number = bisaDiubah ? Number(value) : NaN;

  const salah =
    !Number.isFinite(number) ||
    (integer && !Number.isInteger(number)) ||
    number < min ||
    number > max;
  if (salah) {
    const jenis = integer ? "bilangan bulat" : "angka";
    throw new HttpError(
      400,
      `${label} harus berupa ${jenis} ${min} sampai ${max}.`,
    );
  }
  return number;
}
