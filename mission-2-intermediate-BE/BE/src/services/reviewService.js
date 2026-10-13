import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";

const MAX_COMMENT = 500;

const toId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(404, "Kelas tidak ditemukan.");
  }
  return id;
};

export async function listByProduct(productId) {
  const id = toId(productId);

  const rows = await db("review as r")
    .join("user as u", "u.user_id", "r.user_id")
    .where("r.product_id", id)
    .select(
      "r.review_id as id",
      "u.first_name",
      "u.last_name",
      "r.rating",
      "r.comment",
    )
    .orderBy("r.review_id", "desc");

  return rows.map((row) => ({
    id: row.id,
    name: `${row.first_name} ${row.last_name}`.trim(),
    rating: row.rating,
    comment: row.comment ?? "",
  }));
}

export async function getMine(userId, productId) {
  const id = toId(productId);

  const row = await db("review")
    .where({ user_id: userId, product_id: id })
    .select("rating", "comment")
    .first();

  return row ? { rating: row.rating, comment: row.comment ?? "" } : null;
}

export async function save(userId, productId, body = {}) {
  const id = toId(productId);

  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new HttpError(400, "Rating harus berupa bilangan bulat 1 sampai 5.");
  }

  const comment = typeof body.comment === "string" ? body.comment.trim() : "";
  if (comment.length > MAX_COMMENT) {
    throw new HttpError(400, `Komentar maksimal ${MAX_COMMENT} karakter.`);
  }

  const dimiliki = await db("kelas_saya")
    .where({ user_id: userId, product_id: id })
    .first();
  if (!dimiliki) {
    throw new HttpError(403, "Hanya peserta kelas yang bisa memberi ulasan.");
  }

  const sudahAda = await db("review")
    .where({ user_id: userId, product_id: id })
    .first();

  if (sudahAda) {
    await db("review")
      .where({ review_id: sudahAda.review_id })
      .update({ rating, comment: comment || null });
  } else {
    await db("review").insert({
      user_id: userId,
      product_id: id,
      rating,
      comment: comment || null,
    });
  }

  return getMine(userId, id);
}
