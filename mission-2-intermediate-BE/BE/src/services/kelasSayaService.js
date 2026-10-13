import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { produkService } from "./produkService.js";

const NOT_OWNED = "Kamu belum memiliki akses ke kelas ini.";

const toId = (value, message) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(404, message);
  return id;
};

const findEnrollment = (conn, userId, productId) =>
  conn("kelas_saya").where({ user_id: userId, product_id: productId }).first();

async function getCompletedIds(conn, userId, productId) {
  const rows = await conn("progress_material as pm")
    .join("material as m", "m.material_id", "pm.material_id")
    .join("modul_kelas as mk", "mk.module_id", "m.module_id")
    .where({ "pm.user_id": userId, "mk.product_id": productId })
    .select("pm.material_id")
    .orderBy("pm.material_id");
  return rows.map((row) => row.material_id);
}

async function issueCertificate(trx, userId, productId) {
  const sudahAda = await trx("certificate")
    .where({ user_id: userId, product_id: productId })
    .first();
  if (sudahAda) return;

  await trx("certificate").insert({
    product_id: productId,
    user_id: userId,
    certificate_number: `VBL/CERT/${String(productId).padStart(3, "0")}-${String(userId).padStart(5, "0")}`,
    issue_date: db.raw("CURDATE()"),
  });
}

export async function listByUser(userId) {
  const rows = await db("kelas_saya as ks")
    .join("produk_kelas as p", "p.product_id", "ks.product_id")
    .join("tutor as t", "t.tutor_id", "p.tutor_id")
    .where("ks.user_id", userId)
    .select(
      "p.product_id as id",
      "p.product_name as title",
      "p.image",
      "t.tutor_name as instructorName",
      "t.tutor_profession as instructorRole",
      "t.avatar as instructorAvatar",
      "ks.progress",
      db.raw(`(SELECT COUNT(*) FROM material m
               JOIN modul_kelas mk ON mk.module_id = m.module_id
               WHERE mk.product_id = p.product_id) AS moduleCount`),
      db.raw(`(SELECT COALESCE(SUM(m.duration_minutes), 0) FROM material m
               JOIN modul_kelas mk ON mk.module_id = m.module_id
               WHERE mk.product_id = p.product_id) AS totalMinutes`),
      db.raw(`(SELECT COUNT(*) FROM progress_material pm
               JOIN material m ON m.material_id = pm.material_id
               JOIN modul_kelas mk ON mk.module_id = m.module_id
               WHERE pm.user_id = ks.user_id
                 AND mk.product_id = p.product_id) AS completedCount`),
    )
    .orderBy("p.product_id");

  return rows.map((row) => ({
    ...row,
    moduleCount: Number(row.moduleCount),
    totalMinutes: Number(row.totalMinutes),
    completedCount: Number(row.completedCount),
  }));
}

export async function getOne(userId, productId) {
  const id = toId(productId, "Kelas tidak ditemukan.");

  const enrollment = await findEnrollment(db, userId, id);
  if (!enrollment) throw new HttpError(404, NOT_OWNED);

  const course = await produkService.getById(id);
  const completedIds = await getCompletedIds(db, userId, id);

  return { ...course, progress: enrollment.progress, completedIds };
}

export async function setCompleted(userId, productId, materialId, completed) {
  const pid = toId(productId, "Kelas tidak ditemukan.");
  const mid = toId(materialId, "Materi tidak ditemukan.");

  return db.transaction(async (trx) => {
    if (!(await findEnrollment(trx, userId, pid))) {
      throw new HttpError(404, NOT_OWNED);
    }

    const material = await trx("material as m")
      .join("modul_kelas as mk", "mk.module_id", "m.module_id")
      .where({ "m.material_id": mid, "mk.product_id": pid })
      .first("m.material_id");
    if (!material) throw new HttpError(404, "Materi tidak ditemukan.");

    const key = { user_id: userId, material_id: mid };
    if (completed) {
      const sudahAda = await trx("progress_material").where(key).first();
      if (!sudahAda) await trx("progress_material").insert(key);
    } else {
      await trx("progress_material").where(key).del();
    }

    const { total } = await trx("material as m")
      .join("modul_kelas as mk", "mk.module_id", "m.module_id")
      .where("mk.product_id", pid)
      .count({ total: "*" })
      .first();

    const completedIds = await getCompletedIds(trx, userId, pid);
    const progress =
      Number(total) > 0
        ? Math.round((completedIds.length / Number(total)) * 100)
        : 0;

    await trx("kelas_saya")
      .where({ user_id: userId, product_id: pid })
      .update({ progress });

    if (progress >= 100) await issueCertificate(trx, userId, pid);

    return { progress, completedIds };
  });
}

export async function getCertificate(userId, productId) {
  const id = toId(productId, "Sertifikat tidak ditemukan.");

  const row = await db("certificate")
    .where({ user_id: userId, product_id: id })
    .select(
      "certificate_number as certificateNumber",
      db.raw("DATE_FORMAT(issue_date, '%Y-%m-%d') AS issueDate"),
    )
    .first();

  if (!row) {
    throw new HttpError(
      404,
      "Sertifikat belum tersedia. Selesaikan semua materi terlebih dahulu.",
    );
  }
  return row;
}
