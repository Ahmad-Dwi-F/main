import bcrypt from "bcryptjs";
import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { signToken } from "../utils/token.js";

const GENDERS = ["Laki-laki", "Perempuan"];
const MIN_PASSWORD = 6;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const USER_COLUMNS = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "jenis_kelamin",
];

const toUser = (row) => ({
  id: row.user_id,
  nama: `${row.first_name} ${row.last_name}`.trim(),
  email: row.email,
  jenisKelamin: row.jenis_kelamin,
  noHp: row.phone_number,
});

const splitName = (nama) => {
  const [first, ...rest] = nama.trim().split(/\s+/);
  return { first_name: first, last_name: rest.join(" ") };
};

function validateProfile({ nama, email, noHp, jenisKelamin }) {
  if (!nama?.trim() || !email?.trim() || !noHp?.trim()) {
    throw new HttpError(400, "Nama, email, dan nomor HP wajib diisi.");
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    throw new HttpError(400, "Format email tidak valid.");
  }
  if (jenisKelamin && !GENDERS.includes(jenisKelamin)) {
    throw new HttpError(400, "Jenis kelamin tidak valid.");
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < MIN_PASSWORD) {
    throw new HttpError(400, `Kata sandi minimal ${MIN_PASSWORD} karakter.`);
  }
}

export async function getById(userId) {
  const row = await db("user")
    .select(USER_COLUMNS)
    .where({ user_id: userId })
    .first();
  if (!row) throw new HttpError(404, "Akun tidak ditemukan.");
  return toUser(row);
}

export async function register(body) {
  validateProfile(body);
  validatePassword(body.password);

  try {
    const [userId] = await db("user").insert({
      ...splitName(body.nama),
      email: body.email.trim().toLowerCase(),
      password: await bcrypt.hash(body.password, 10),
      phone_number: body.noHp.trim(),
      jenis_kelamin: body.jenisKelamin ?? "Laki-laki",
    });
    return getById(userId);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new HttpError(409, "Email ini sudah terdaftar. Silakan masuk.");
    }
    throw error;
  }
}

export async function login({ email, password }) {
  const row =
    typeof email === "string" && typeof password === "string"
      ? await db("user").where({ email: email.trim().toLowerCase() }).first()
      : null;

  const valid = row && (await bcrypt.compare(password, row.password));
  if (!valid) {
    throw new HttpError(401, "Akun belum terdaftar atau password salah!");
  }
  return { token: signToken(row.user_id), user: toUser(row) };
}

export async function updateProfile(userId, body) {
  validateProfile(body);

  const changes = {
    ...splitName(body.nama),
    email: body.email.trim().toLowerCase(),
    phone_number: body.noHp.trim(),
  };
  if (body.jenisKelamin) changes.jenis_kelamin = body.jenisKelamin;
  if (body.password) {
    validatePassword(body.password);
    changes.password = await bcrypt.hash(body.password, 10);
  }

  try {
    await db("user").where({ user_id: userId }).update(changes);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new HttpError(409, "Email ini sudah dipakai akun lain.");
    }
    throw error;
  }
  return getById(userId);
}

export async function deleteAccount(userId) {
  await db.transaction(async (trx) => {
    await trx("certificate").where({ user_id: userId }).del();
    await trx("pembayaran")
      .whereIn(
        "order_id",
        trx("orders").select("order_id").where({ user_id: userId }),
      )
      .del();
    await trx("orders").where({ user_id: userId }).del();
    await trx("user").where({ user_id: userId }).del();
  });
}
