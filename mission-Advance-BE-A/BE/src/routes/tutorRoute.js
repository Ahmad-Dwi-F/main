import { Router } from "express";
import { tutorService } from "../services/tutorService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await tutorService.getAll(req.query));
});

router.get("/:id", async (req, res) => {
  res.json(await tutorService.getById(req.params.id));
});

router.post("/", requireAuth, async (req, res) => {
  res.status(201).json(await tutorService.add(req.body));
});

router.patch("/:id", requireAuth, async (req, res) => {
  res.json(await tutorService.update(req.params.id, req.body));
});

router.delete("/:id", requireAuth, async (req, res) => {
  await tutorService.remove(req.params.id);
  res.json({ message: "Tutor berhasil dihapus." });
});

export default router;
