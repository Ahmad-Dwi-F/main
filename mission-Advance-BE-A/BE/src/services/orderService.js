import db from "../config/database.js";
import { ADMIN_FEE } from "../config/constants.js";
import { HttpError } from "../utils/httpError.js";
import {
  likePattern,
  readKeyword,
  readOneOf,
  readSort,
} from "../utils/queryParams.js";

const STATUS_SAAT_BUAT = ["berhasil", "menunggu"];
const STATUS_SAAT_UBAH = ["berhasil", "gagal"];
const STATUS_FILTER = ["menunggu", "berhasil", "gagal"];

const SORT_COLUMNS = {
  date: "o.order_date",
  title: "p.product_name",
  total: "o.total_amount",
};

const orderQuery = (conn) =>
  conn("orders as o")
    .join("pembayaran as pb", "pb.order_id", "o.order_id")
    .join("produk_kelas as p", "p.product_id", "o.product_id")
    .select(
      "o.order_id as orderId",
      "pb.invoice_number as invoice",
      "o.product_id as courseId",
      "p.product_name as title",
      "p.image",
      "o.total_amount as total",
      "pb.payment_method as methodId",
      "o.order_date as paymentTime",
      "pb.payment_status as status",
    );

const toOrder = (row) => ({ ...row, price: row.total - ADMIN_FEE });

async function findOrder(conn, userId, orderId) {
  const row = await orderQuery(conn)
    .where({ "o.user_id": userId, "o.order_id": orderId })
    .first();
  return row ? toOrder(row) : null;
}

async function enroll(trx, userId, productId) {
  const sudahAda = await trx("kelas_saya")
    .where({ user_id: userId, product_id: productId })
    .first();
  if (!sudahAda) {
    await trx("kelas_saya").insert({
      user_id: userId,
      product_id: productId,
      progress: 0,
    });
  }
}

export async function listByUser(userId, query = {}) {
  const status = readOneOf(query.status, STATUS_FILTER, "status");
  const keyword = readKeyword(query.q);
  const { sort, order } = readSort(query, SORT_COLUMNS, {
    sort: "date",
    order: "desc",
  });

  const builder = orderQuery(db).where("o.user_id", userId);
  if (status) builder.where("pb.payment_status", status);
  if (keyword) {
    builder.whereRaw("p.product_name LIKE ?", [likePattern(keyword)]);
  }

  const rows = await builder
    .orderByRaw(`${SORT_COLUMNS[sort]} ${order}`)
    .orderBy("o.order_id", order);
  return rows.map(toOrder);
}

export async function create(
  userId,
  { productId, paymentMethod, status } = {},
) {
  const id = Number(productId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "Produk tidak valid.");
  }
  if (
    typeof paymentMethod !== "string" ||
    !paymentMethod.trim() ||
    paymentMethod.length > 50
  ) {
    throw new HttpError(400, "Metode pembayaran tidak valid.");
  }
  if (!STATUS_SAAT_BUAT.includes(status)) {
    throw new HttpError(400, "Status pesanan tidak valid.");
  }

  const produk = await db("produk_kelas").where({ product_id: id }).first();

  if (!produk || produk.status !== "terbit") {
    throw new HttpError(404, "Produk tidak ditemukan.");
  }

  const hargaAkhir = Math.round(produk.price * (1 - produk.discount / 100));
  const total = hargaAkhir + ADMIN_FEE;
  const metode = paymentMethod.trim();

  return db.transaction(async (trx) => {
    const dimiliki = await trx("kelas_saya")
      .where({ user_id: userId, product_id: id })
      .first();
    if (dimiliki) throw new HttpError(409, "Kamu sudah memiliki kelas ini.");

    const tertunda = await trx("orders as o")
      .join("pembayaran as pb", "pb.order_id", "o.order_id")
      .where({
        "o.user_id": userId,
        "o.product_id": id,
        "pb.payment_status": "menunggu",
      })
      .select("o.order_id")
      .orderBy("o.order_id", "desc")
      .first();

    let orderId;
    if (tertunda) {
      orderId = tertunda.order_id;
      await trx("pembayaran")
        .where({ order_id: orderId })
        .update({ payment_method: metode, payment_status: status });
    } else {
      const [newId] = await trx("orders").insert({
        user_id: userId,
        product_id: id,
        total_amount: total,
        created_at: db.fn.now(),
        order_date: db.fn.now(),
      });
      orderId = newId;
      await trx("pembayaran").insert({
        order_id: orderId,
        payment_method: metode,
        payment_status: status,
        invoice_number: `HEL/VI/${String(orderId).padStart(8, "0")}`,
      });
    }

    if (status === "berhasil") await enroll(trx, userId, id);
    return findOrder(trx, userId, orderId);
  });
}

export async function updateStatus(userId, orderId, status) {
  const id = Number(orderId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "Pesanan tidak valid.");
  }
  if (!STATUS_SAAT_UBAH.includes(status)) {
    throw new HttpError(400, "Status pesanan tidak valid.");
  }

  return db.transaction(async (trx) => {
    const order = await findOrder(trx, userId, id);
    if (!order) throw new HttpError(404, "Pesanan tidak ditemukan.");
    if (order.status !== "menunggu") {
      throw new HttpError(
        409,
        "Pesanan ini sudah selesai diproses dan tidak bisa diubah.",
      );
    }

    await trx("pembayaran")
      .where({ order_id: id })
      .update({ payment_status: status });
    if (status === "berhasil") await enroll(trx, userId, order.courseId);

    return findOrder(trx, userId, id);
  });
}
