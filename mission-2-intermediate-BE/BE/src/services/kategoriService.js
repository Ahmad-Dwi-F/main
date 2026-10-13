import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { parseId, readText } from "../utils/validate.js";
import { rethrowDbError } from "../utils/dbError.js";

const NOT_FOUND = "Kategori tidak ditemukan.";
const DUPLICATE = "Nama kategori sudah dipakai.";

const toKategori = (row) => ({ id: row.category_id, name: row.category_name });

async function findRow(categoryId) {
  const row = await db("kategori_kelas")
    .where({ category_id: categoryId })
    .first();
  if (!row) throw new HttpError(404, NOT_FOUND);
  return row;
}

async function getAll() {
  const rows = await db("kategori_kelas").orderBy("category_name");
  return rows.map(toKategori);
}

async function getById(id) {
  return toKategori(await findRow(parseId(id, NOT_FOUND)));
}

async function add(body = {}) {
  const name = readText(body.name, "Nama kategori", 255);

  try {
    const [id] = await db("kategori_kelas").insert({ category_name: name });
    return await getById(id);
  } catch (error) {
    return rethrowDbError(error, { duplicate: DUPLICATE });
  }
}

async function update(id, body = {}) {
  const categoryId = parseId(id, NOT_FOUND);
  const name = readText(body.name, "Nama kategori", 255);
  await findRow(categoryId);

  try {
    await db("kategori_kelas")
      .where({ category_id: categoryId })
      .update({ category_name: name });
  } catch (error) {
    rethrowDbError(error, { duplicate: DUPLICATE });
  }
  return getById(categoryId);
}

async function remove(id) {
  const categoryId = parseId(id, NOT_FOUND);
  await findRow(categoryId);

  try {
    await db("kategori_kelas").where({ category_id: categoryId }).del();
  } catch (error) {
    rethrowDbError(error, {
      inUse: "Kategori masih dipakai oleh kelas, tidak bisa dihapus.",
    });
  }
}

export const kategoriService = { getAll, getById, add, update, remove };
