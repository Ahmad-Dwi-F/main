import { Router } from "express";
import { tutorSayaService } from "../services/tutorSayaService.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  res.json(await tutorSayaService.getProfile(req.userId));
});

router.put("/", async (req, res) => {
  res.json(await tutorSayaService.saveProfile(req.userId, req.body));
});

router.post("/gambar", uploadImage, (req, res) => {
  res.status(201).json({ image: `uploads/${req.file.filename}` });
});

router.get("/kelas", async (req, res) => {
  res.json(await tutorSayaService.listCourses(req.userId, req.query));
});

router.post("/kelas", async (req, res) => {
  res
    .status(201)
    .json(await tutorSayaService.createCourse(req.userId, req.body));
});

router.get("/kelas/:id", async (req, res) => {
  res.json(await tutorSayaService.getCourse(req.userId, req.params.id));
});

router.patch("/kelas/:id", async (req, res) => {
  res.json(
    await tutorSayaService.updateCourse(req.userId, req.params.id, req.body),
  );
});

router.patch("/kelas/:id/status", async (req, res) => {
  res.json(
    await tutorSayaService.setStatus(
      req.userId,
      req.params.id,
      req.body?.status,
    ),
  );
});

router.delete("/kelas/:id", async (req, res) => {
  await tutorSayaService.removeCourse(req.userId, req.params.id);
  res.json({ message: "Kelas berhasil dihapus." });
});

export default router;
