import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { parseId, readText } from "../utils/validate.js";
import { rethrowDbError } from "../utils/dbError.js";
import { likePattern, readKeyword, readSort } from "../utils/queryParams.js";

const NOT_FOUND = "Tutor tidak ditemukan.";

const SORT_COLUMNS = {
  id: "tutor_id",
  name: "tutor_name",
  profession: "tutor_profession",
};

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

async function getAll(query = {}) {
  const keyword = readKeyword(query.q);
  const { sort, order } = readSort(query, SORT_COLUMNS);

  const builder = db("tutor");
  if (keyword) {
    const pattern = likePattern(keyword);
    builder.where((group) =>
      group
        .whereRaw("tutor_name LIKE ?", [pattern])
        .orWhereRaw("tutor_profession LIKE ?", [pattern]),
    );
  }

  builder.orderByRaw(`${SORT_COLUMNS[sort]} ${order}`);
  if (sort !== "id") builder.orderBy("tutor_id");

  const rows = await builder;
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
