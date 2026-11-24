import { Router } from "express";
import * as kelasSayaService from "../services/kelasSayaService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  res.json(await kelasSayaService.listByUser(req.userId, req.query));
});

router.get("/:productId", async (req, res) => {
  res.json(await kelasSayaService.getOne(req.userId, req.params.productId));
});

router.put("/:productId/materi/:materialId", async (req, res) => {
  const { productId, materialId } = req.params;
  res.json(
    await kelasSayaService.setCompleted(
      req.userId,
      productId,
      materialId,
      true,
    ),
  );
});

router.delete("/:productId/materi/:materialId", async (req, res) => {
  const { productId, materialId } = req.params;
  res.json(
    await kelasSayaService.setCompleted(
      req.userId,
      productId,
      materialId,
      false,
    ),
  );
});

export default router;
