import { Router } from "express";
import { kategoriService } from "../services/kategoriService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await kategoriService.getAll());
});

router.get("/:id", async (req, res) => {
  res.json(await kategoriService.getById(req.params.id));
});

router.post("/", requireAuth, async (req, res) => {
  res.status(201).json(await kategoriService.add(req.body));
});

router.patch("/:id", requireAuth, async (req, res) => {
  res.json(await kategoriService.update(req.params.id, req.body));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await kategoriService.remove(req.params.id);
  res.json({ message: "Kategori berhasil dihapus." });
});

export default router;
