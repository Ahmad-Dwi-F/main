import { Router } from "express";
import { produkService } from "../services/produkService.js";
import { requireAuth } from "../middleware/auth.js";
import { HttpError } from "../utils/httpError.js";
import { parseId } from "../utils/validate.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await produkService.getAll(req.query));
});

router.get("/:id", async (req, res) => {
  const id = parseId(req.params.id, "Produk tidak ditemukan.");
  const produk = await produkService.getById(id, { publicOnly: true });
  if (!produk) throw new HttpError(404, "Produk tidak ditemukan.");
  res.json(produk);
});

router.post("/", requireAuth, async (req, res) => {
  res.status(201).json(await produkService.add(req.body));
});

router.patch("/:id", requireAuth, async (req, res) => {
  res.json(await produkService.update(req.params.id, req.body));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await produkService.remove(req.params.id);
  res.json({ message: "Produk berhasil dihapus." });
});

export default router;
