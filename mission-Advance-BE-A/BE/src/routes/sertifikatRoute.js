import { Router } from "express";
import * as kelasSayaService from "../services/kelasSayaService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/:productId", async (req, res) => {
  res.json(
    await kelasSayaService.getCertificate(req.userId, req.params.productId),
  );
});

export default router;
