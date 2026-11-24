import fs from "node:fs";
import path from "node:path";
import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { parseId, readNumber, readText } from "../utils/validate.js";
import { rethrowDbError } from "../utils/dbError.js";
import {
  likePattern,
  readKeyword,
  readOneOf,
  readSort,
} from "../utils/queryParams.js";
import { UPLOAD_DIR } from "../middleware/upload.js";
import {
  CURRICULUM_TEMPLATE,
  MATERIAL_DEFAULTS,
} from "../config/kurikulumTemplate.js";

const NOT_FOUND = "Kelas tidak ditemukan.";
const MISSING_CATEGORY = "Kategori tidak ditemukan.";
const STATUSES = ["draft", "terbit"];

const FINAL_PRICE = "ROUND(p.price * (1 - p.discount / 100))";

const SORT_COLUMNS = {
  id: "p.product_id",
  title: "p.product_name",
  price: FINAL_PRICE,
  participants: "participantCount",
};

const PRESET_IMAGE = /^cc-(?:[1-9]|1[0-5])\.jpg$/;

const toProfile = (row) => ({
  id: row.tutor_id,
  name: row.tutor_name,
  profession: row.tutor_profession,
  avatar: row.avatar,
});

const findTutor = (conn, userId) =>
  conn("tutor").where({ user_id: userId }).first();

async function ensureTutor(conn, userId, profession = null) {
  const existing = await findTutor(conn, userId);
  if (existing) return existing;

  const user = await conn("user").where({ user_id: userId }).first();
  if (!user) {
    throw new HttpError(401, "Sesi tidak valid, silakan masuk lagi.");
  }

  await conn("tutor").insert({
    tutor_name: `${user.first_name} ${user.last_name}`.trim(),
    tutor_profession: profession,
    avatar: user.avatar ?? null,
    user_id: userId,
  });
  return findTutor(conn, userId);
}

async function getProfile(userId) {
  const row = await findTutor(db, userId);
  return row ? toProfile(row) : null;
}

async function saveProfile(userId, body = {}) {
  const profession = readText(body.profession, "Profesi", 100, {
    required: false,
  });

  return db.transaction(async (trx) => {
    const tutor = await ensureTutor(trx, userId, profession);
    await trx("tutor")
      .where({ tutor_id: tutor.tutor_id })
      .update({ tutor_profession: profession });
    return toProfile(await findTutor(trx, userId));
  });
}

const courseQuery = (conn) =>
  conn("produk_kelas as p")
    .join("kategori_kelas as k", "k.category_id", "p.category_id")
    .select(
      "p.product_id as id",
      "p.product_name as title",
      "p.image",
      "p.status",
      "p.price as originalPrice",
      "p.discount",
      conn.raw(`${FINAL_PRICE} as price`),
      "p.category_id as categoryId",
      "k.category_name as category",
      conn.raw(
        "(SELECT COUNT(*) FROM kelas_saya ks WHERE ks.product_id = p.product_id) AS participantCount",
      ),
    );

const toCourse = (row) => ({
  ...row,
  originalPrice: Number(row.originalPrice),
  price: Number(row.price),
  participantCount: Number(row.participantCount),
});

async function findOwnCourse(conn, userId, productId) {
  const tutor = await findTutor(conn, userId);
  const row = tutor
    ? await courseQuery(conn)
        .where({ "p.product_id": productId, "p.tutor_id": tutor.tutor_id })
        .first()
    : null;

  if (!row) throw new HttpError(404, NOT_FOUND);
  return toCourse(row);
}

function readImage(value, userId) {
  const image = typeof value === "string" ? value.trim() : "";
  if (PRESET_IMAGE.test(image)) return image;

  const own = new RegExp(`^uploads/u${userId}-[0-9a-f-]{36}\\.(jpg|png|webp)$`);
  if (
    own.test(image) &&
    fs.existsSync(path.join(UPLOAD_DIR, path.basename(image)))
  ) {
    return image;
  }

  throw new HttpError(
    400,
    "Gambar tidak valid. Pilih cc-1 sampai cc-15 atau unggah gambar sendiri.",
  );
}

function readCourse(body = {}, { partial, userId }) {
  const changes = {};

  if (!partial || body.title !== undefined) {
    const title = readText(body.title, "Nama kelas", 150);

    if (/[<>]/.test(title)) {
      throw new HttpError(400, "Nama kelas tidak boleh memuat tanda < atau >.");
    }
    changes.product_name = title;
  }
  if (!partial || body.originalPrice !== undefined) {
    changes.price = readNumber(body.originalPrice, "Harga", {
      min: 0,
      max: 99999999,
    });
  }
  if (body.discount !== undefined) {
    changes.discount = readNumber(body.discount, "Diskon", {
      min: 0,
      max: 100,
      integer: true,
    });
  } else if (!partial) {
    changes.discount = 0;
  }
  if (changes.discount !== undefined) {
    changes.is_discount = changes.discount > 0 ? 1 : 0;
  }
  if (!partial || body.categoryId !== undefined) {
    changes.category_id = readNumber(body.categoryId, "Kategori", {
      min: 1,
      max: 4294967295,
      integer: true,
    });
  }
  if (!partial || body.image !== undefined) {
    changes.image = readImage(body.image, userId);
  }

  if (Object.keys(changes).length === 0) {
    throw new HttpError(400, "Tidak ada data yang diubah.");
  }
  return changes;
}

async function createDefaultCurriculum(trx, productId) {
  for (const modul of CURRICULUM_TEMPLATE) {
    const [moduleId] = await trx("modul_kelas").insert({
      product_id: productId,
      module_title: modul.title,
    });

    await trx("material").insert(
      modul.items.map((type) => ({
        module_id: moduleId,
        material_type: type,
        material_title: MATERIAL_DEFAULTS[type].title,
        duration_minutes: MATERIAL_DEFAULTS[type].minutes,
      })),
    );
  }
}

function removeUpload(image) {
  if (typeof image !== "string" || !image.startsWith("uploads/")) return;
  fs.promises
    .unlink(path.join(UPLOAD_DIR, path.basename(image)))
    .catch(() => {});
}

async function listCourses(userId, query = {}) {
  const status = readOneOf(query.status, STATUSES, "status");
  const keyword = readKeyword(query.q);
  const { sort, order } = readSort(query, SORT_COLUMNS, {
    sort: "id",
    order: "desc",
  });

  const tutor = await findTutor(db, userId);
  if (!tutor) return [];

  const builder = courseQuery(db).where("p.tutor_id", tutor.tutor_id);
  if (status) builder.where("p.status", status);
  if (keyword) {
    builder.whereRaw("p.product_name LIKE ?", [likePattern(keyword)]);
  }

  builder.orderByRaw(`${SORT_COLUMNS[sort]} ${order}`);
  if (sort !== "id") builder.orderBy("p.product_id");

  return (await builder).map(toCourse);
}

function getCourse(userId, id) {
  return findOwnCourse(db, userId, parseId(id, NOT_FOUND));
}

async function createCourse(userId, body = {}) {
  const data = readCourse(body, { partial: false, userId });

  try {
    const productId = await db.transaction(async (trx) => {
      const tutor = await ensureTutor(trx, userId);
      const [id] = await trx("produk_kelas").insert({
        ...data,
        tutor_id: tutor.tutor_id,
        status: "draft",
      });
      await createDefaultCurriculum(trx, id);
      return id;
    });
    return await findOwnCourse(db, userId, productId);
  } catch (error) {
    return rethrowDbError(error, { missingRef: MISSING_CATEGORY });
  }
}

async function updateCourse(userId, id, body = {}) {
  const productId = parseId(id, NOT_FOUND);
  const changes = readCourse(body, { partial: true, userId });
  const before = await findOwnCourse(db, userId, productId);

  try {
    await db("produk_kelas").where({ product_id: productId }).update(changes);
  } catch (error) {
    rethrowDbError(error, { missingRef: MISSING_CATEGORY });
  }

  if (changes.image && changes.image !== before.image)
    removeUpload(before.image);
  return findOwnCourse(db, userId, productId);
}

async function setStatus(userId, id, value) {
  const productId = parseId(id, NOT_FOUND);
  const status = readOneOf(value, STATUSES, "status");
  if (!status) {
    throw new HttpError(
      400,
      "Parameter status wajib diisi: draft atau terbit.",
    );
  }

  await findOwnCourse(db, userId, productId);
  await db("produk_kelas").where({ product_id: productId }).update({ status });
  return findOwnCourse(db, userId, productId);
}

async function removeCourse(userId, id) {
  const productId = parseId(id, NOT_FOUND);
  const course = await findOwnCourse(db, userId, productId);

  const hasOrder = await db("orders")
    .where({ product_id: productId })
    .first("order_id");
  const hasStudent = await db("kelas_saya")
    .where({ product_id: productId })
    .first("product_id");
  if (hasOrder || hasStudent) {
    throw new HttpError(
      409,
      "Kelas sudah punya pesanan atau peserta, tidak bisa dihapus. Gunakan Sembunyikan.",
    );
  }

  try {
    await db.transaction(async (trx) => {
      const moduleIds = trx("modul_kelas")
        .select("module_id")
        .where({ product_id: productId });

      await trx("pretest").whereIn("module_id", moduleIds).del();
      await trx("material").whereIn("module_id", moduleIds).del();
      await trx("modul_kelas").where({ product_id: productId }).del();
      await trx("produk_kelas").where({ product_id: productId }).del();
    });
  } catch (error) {
    rethrowDbError(error, {
      inUse: "Kelas masih dipakai, tidak bisa dihapus. Gunakan Sembunyikan.",
    });
  }

  removeUpload(course.image);
}

export const tutorSayaService = {
  getProfile,
  saveProfile,
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  setStatus,
  removeCourse,
};
