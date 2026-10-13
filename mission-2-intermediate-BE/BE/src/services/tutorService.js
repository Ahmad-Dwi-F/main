import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { parseId, readText } from "../utils/validate.js";
import { rethrowDbError } from "../utils/dbError.js";

const NOT_FOUND = "Tutor tidak ditemukan.";

const toTutor = (row) => ({
  id: row.tutor_id,
  name: row.tutor_name,
  profession: row.tutor_profession,
  avatar: row.avatar,
});

async function findRow(tutorId) {
  const row = await db("tutor").where({ tutor_id: tutorId }).first();
  if (!row) throw new HttpError(404, NOT_FOUND);
  return row;
}

function readTutor(body = {}, { partial } = {}) {
  const changes = {};

  if (!partial || body.name !== undefined) {
    changes.tutor_name = readText(body.name, "Nama tutor", 100);
  }
  if (!partial || body.profession !== undefined) {
    changes.tutor_profession = readText(body.profession, "Profesi", 100, {
      required: false,
    });
  }
  if (!partial || body.avatar !== undefined) {
    changes.avatar = readText(body.avatar, "Avatar", 100, { required: false });
  }

  if (Object.keys(changes).length === 0) {
    throw new HttpError(400, "Tidak ada data yang diubah.");
  }
  return changes;
}

async function getAll() {
  const rows = await db("tutor").orderBy("tutor_id");
  return rows.map(toTutor);
}

async function getById(id) {
  return toTutor(await findRow(parseId(id, NOT_FOUND)));
}

async function add(body) {
  const data = readTutor(body, { partial: false });
  const [id] = await db("tutor").insert(data);
  return getById(id);
}

async function update(id, body) {
  const tutorId = parseId(id, NOT_FOUND);
  const changes = readTutor(body, { partial: true });
  await findRow(tutorId);

  await db("tutor").where({ tutor_id: tutorId }).update(changes);
  return getById(tutorId);
}

async function remove(id) {
  const tutorId = parseId(id, NOT_FOUND);
  await findRow(tutorId);

  try {
    await db("tutor").where({ tutor_id: tutorId }).del();
  } catch (error) {
    rethrowDbError(error, {
      inUse: "Tutor masih dipakai oleh kelas, tidak bisa dihapus.",
    });
  }
}

export const tutorService = { getAll, getById, add, update, remove };
