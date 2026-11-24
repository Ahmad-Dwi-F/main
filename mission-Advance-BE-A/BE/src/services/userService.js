import bcrypt from "bcrypt";
import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { signToken } from "../utils/token.js";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../utils/mailer.js";

const GENDERS = ["Laki-laki", "Perempuan"];
const MIN_PASSWORD = 6;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const AVATAR_PATTERN = /^(pp-profil\.png|foto[1-8]\.jpg)$/;

const USER_COLUMNS = [
  "user_id",
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "jenis_kelamin",
  "avatar",
  "is_verified",
];

const toUser = (row) => ({
  id: row.user_id,
  nama: `${row.first_name} ${row.last_name}`.trim(),
  email: row.email,
  jenisKelamin: row.jenis_kelamin,
  noHp: row.phone_number,
  avatar: row.avatar ?? null,
  isVerified: Boolean(row.is_verified),
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

  const normalizedEmail = body.email.trim().toLowerCase();
  const verificationToken = uuidv4();

  try {
    const [userId] = await db("user").insert({
      ...splitName(body.nama),
      email: normalizedEmail,
      password: await bcrypt.hash(body.password, 10),
      phone_number: body.noHp.trim(),
      jenis_kelamin: body.jenisKelamin ?? "Laki-laki",
      verification_token: verificationToken,
      is_verified: 0,
    });

    await sendVerificationEmail({
      to: normalizedEmail,
      token: verificationToken,
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
    await db("tutor")
      .where({ user_id: userId })
      .update({
        tutor_name: `${changes.first_name} ${changes.last_name}`.trim(),
      });
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

export async function setAvatar(userId, body = {}) {
  const { avatar } = body;
  if (
    avatar !== null &&
    (typeof avatar !== "string" || !AVATAR_PATTERN.test(avatar))
  ) {
    throw new HttpError(400, "Foto profil tidak valid.");
  }

  await db.transaction(async (trx) => {
    await trx("user").where({ user_id: userId }).update({ avatar });
    await trx("tutor").where({ user_id: userId }).update({ avatar });
  });
  return getById(userId);
}

export async function verifyEmailToken(token) {
  if (typeof token !== "string" || !token.trim()) {
    throw new HttpError(400, "Invalid Verification Token");
  }

  const user = await db("user")
    .where({ verification_token: token.trim() })
    .first("user_id");

  if (!user) {
    throw new HttpError(400, "Invalid Verification Token");
  }

  await db("user").where({ user_id: user.user_id }).update({
    is_verified: 1,
    verification_token: null,
  });

  return { message: "Email Verified Successfully" };
}
