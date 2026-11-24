import { HttpError } from "./httpError.js";

const given = (value) => (value === "" ? undefined : value);

export function readKeyword(value, max = 100) {
  value = given(value);
  if (value === undefined) return "";
  if (typeof value !== "string") {
    throw new HttpError(400, "Parameter q harus berupa satu teks.");
  }

  const keyword = value.trim();
  if (keyword.length > max) {
    throw new HttpError(400, `Parameter q maksimal ${max} karakter.`);
  }
  return keyword;
}

export const likePattern = (keyword) =>
  `%${keyword.replace(/[\\%_]/g, "\\$&")}%`;

export function readSort(
  query,
  allowed,
  fallback = { sort: "id", order: "asc" },
) {
  const sort = given(query.sort) ?? fallback.sort;
  if (typeof sort !== "string" || !Object.hasOwn(allowed, sort)) {
    throw new HttpError(
      400,
      `Parameter sort tidak dikenal. Pilihan: ${Object.keys(allowed).join(", ")}.`,
    );
  }

  const order = String(given(query.order) ?? fallback.order).toLowerCase();
  if (order !== "asc" && order !== "desc") {
    throw new HttpError(400, "Parameter order harus asc atau desc.");
  }
  return { sort, order };
}

export function readNumberParam(value, label) {
  value = given(value);
  if (value === undefined) return undefined;

  const number =
    typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
  if (!Number.isFinite(number) || number < 0) {
    throw new HttpError(
      400,
      `Parameter ${label} harus berupa angka 0 atau lebih.`,
    );
  }
  return number;
}

export function readIdList(value, label) {
  value = given(value);
  if (value === undefined) return [];

  const parts = typeof value === "string" ? value.split(",") : [];
  if (parts.length === 0 || parts.some((part) => !/^\d+$/.test(part.trim()))) {
    throw new HttpError(
      400,
      `Parameter ${label} harus berupa daftar id angka dipisah koma, misalnya 1,2.`,
    );
  }
  return parts.map((part) => Number(part.trim()));
}

export function readOneOf(value, allowed, label) {
  value = given(value);
  if (value === undefined) return undefined;

  if (typeof value !== "string" || !allowed.includes(value)) {
    throw new HttpError(
      400,
      `Parameter ${label} harus salah satu dari: ${allowed.join(", ")}.`,
    );
  }
  return value;
}
