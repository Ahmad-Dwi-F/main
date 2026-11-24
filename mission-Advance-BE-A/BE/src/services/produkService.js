import db from "../config/database.js";
import { HttpError } from "../utils/httpError.js";
import { parseId, readNumber, readText } from "../utils/validate.js";
import { rethrowDbError } from "../utils/dbError.js";
import {
  likePattern,
  readIdList,
  readKeyword,
  readNumberParam,
  readSort,
} from "../utils/queryParams.js";
import { getCurriculumRows, buildCurriculum } from "./kurikulumService.js";

const NOT_FOUND = "Produk tidak ditemukan.";
const MISSING_REF = "Kategori atau tutor tidak ditemukan.";

const FINAL_PRICE = "ROUND(p.price * (1 - p.discount / 100))";

const SORT_COLUMNS = {
  id: "p.product_id",
  title: "p.product_name",
  price: FINAL_PRICE,
  discount: "p.discount",
  rating: "AVG(r.rating)",
};

const baseQuery = () =>
  db("produk_kelas as p")
    .join("kategori_kelas as k", "p.category_id", "k.category_id")
    .join("tutor as t", "p.tutor_id", "t.tutor_id")
    .leftJoin("review as r", "p.product_id", "r.product_id")
    .select(
      "p.product_id as id",
      "p.product_name as title",
      "p.image",
      "p.status",
      db.raw(`${FINAL_PRICE} as price`),
      "p.price as originalPrice",
      "p.discount",
      "p.is_discount as isDiscount",
      "p.category_id as categoryId",
      "k.category_name as category",
      "p.tutor_id as tutorId",
      "t.tutor_name as instructorName",
      "t.tutor_profession as instructorRole",
      "t.avatar as instructorAvatar",
      db.raw("ROUND(AVG(r.rating), 1) as rating"),
      db.raw("COUNT(r.review_id) as reviewCount"),
    )
    .groupBy(
      "p.product_id",
      "p.product_name",
      "p.image",
      "p.status",
      "p.price",
      "p.discount",
      "p.is_discount",
      "p.category_id",
      "k.category_name",
      "p.tutor_id",
      "t.tutor_name",
      "t.tutor_profession",
      "t.avatar",
    );

const buildIncludes = (rows) => {
  const count = {};
  for (const row of rows) {
    count[row.material_type] = (count[row.material_type] ?? 0) + 1;
  }

  return [
    count.quiz && { icon: "exam", label: "Ujian Akhir" },
    count.video && { icon: "video", label: `${count.video} Video` },
    count.rangkuman && { icon: "doc", label: `${count.rangkuman} Dokumen` },
    { icon: "certificate", label: "Sertifikat" },
    count.pretest && { icon: "pretest", label: "Pretest" },
  ].filter(Boolean);
};

function readProduk(body = {}, { partial } = {}) {
  const changes = {};

  if (!partial || body.title !== undefined) {
    const title = readText(body.title, "Judul kelas", 150);
    if (/[<>]/.test(title)) {
      throw new HttpError(
        400,
        "Judul kelas tidak boleh memuat tanda < atau >.",
      );
    }
    changes.product_name = title;
  }
  if (!partial || body.originalPrice !== undefined) {
    changes.price = readNumber(body.originalPrice, "Harga normal", {
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
  if (!partial || body.tutorId !== undefined) {
    changes.tutor_id = readNumber(body.tutorId, "Tutor", {
      min: 1,
      max: 4294967295,
      integer: true,
    });
  }
  if (body.image !== undefined) {
    changes.image = readText(body.image, "Gambar", 100, { required: false });
  }

  if (Object.keys(changes).length === 0) {
    throw new HttpError(400, "Tidak ada data yang diubah.");
  }
  return changes;
}

const exists = (productId) =>
  db("produk_kelas").where({ product_id: productId }).first("product_id");

function getAll(query = {}) {
  const categoryIds = readIdList(query.kategori, "kategori");
  const minPrice = readNumberParam(query.hargaMin, "hargaMin");
  const maxPrice = readNumberParam(query.hargaMax, "hargaMax");
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new HttpError(400, "hargaMin tidak boleh lebih besar dari hargaMax.");
  }
  const keyword = readKeyword(query.q);
  const { sort, order } = readSort(query, SORT_COLUMNS);

  const builder = baseQuery().where("p.status", "terbit");

  if (categoryIds.length > 0) builder.whereIn("p.category_id", categoryIds);
  if (minPrice !== undefined) {
    builder.whereRaw(`${FINAL_PRICE} >= ?`, [minPrice]);
  }
  if (maxPrice !== undefined) {
    builder.whereRaw(`${FINAL_PRICE} <= ?`, [maxPrice]);
  }
  if (keyword) {
    const pattern = likePattern(keyword);
    builder.where((group) =>
      group
        .whereRaw("p.product_name LIKE ?", [pattern])
        .orWhereRaw("t.tutor_name LIKE ?", [pattern]),
    );
  }

  if (sort === "rating") builder.orderByRaw("AVG(r.rating) IS NULL");
  builder.orderByRaw(`${SORT_COLUMNS[sort]} ${order}`);
  if (sort !== "id") builder.orderBy("p.product_id");

  return builder;
}

async function getById(id, { publicOnly = false } = {}) {
  const query = baseQuery().where("p.product_id", id);
  if (publicOnly) query.where("p.status", "terbit");

  const produk = await query.first();
  if (!produk) return undefined;

  const rows = await getCurriculumRows(db, id);
  return {
    ...produk,
    includes: buildIncludes(rows),
    curriculum: buildCurriculum(rows),
  };
}

async function add(body) {
  const data = readProduk(body, { partial: false });

  try {
    const [id] = await db("produk_kelas").insert(data);
    return await getById(id);
  } catch (error) {
    return rethrowDbError(error, { missingRef: MISSING_REF });
  }
}

async function update(id, body) {
  const productId = parseId(id, NOT_FOUND);
  const changes = readProduk(body, { partial: true });
  if (!(await exists(productId))) throw new HttpError(404, NOT_FOUND);

  try {
    await db("produk_kelas").where({ product_id: productId }).update(changes);
  } catch (error) {
    rethrowDbError(error, { missingRef: MISSING_REF });
  }
  return getById(productId);
}

async function remove(id) {
  const productId = parseId(id, NOT_FOUND);
  if (!(await exists(productId))) throw new HttpError(404, NOT_FOUND);

  try {
    await db("produk_kelas").where({ product_id: productId }).del();
  } catch (error) {
    rethrowDbError(error, {
      inUse:
        "Kelas tidak bisa dihapus karena masih punya modul, pesanan, atau peserta.",
    });
  }
}

export const produkService = { getAll, getById, add, update, remove };
