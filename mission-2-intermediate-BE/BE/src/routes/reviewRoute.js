import { Router } from "express";
import * as reviewService from "../services/reviewService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/:productId", async (req, res) => {
  res.json(await reviewService.listByProduct(req.params.productId));
});

router.get("/:productId/saya", requireAuth, async (req, res) => {
  res.json(await reviewService.getMine(req.userId, req.params.productId));
});

router.put("/:productId", requireAuth, async (req, res) => {
  res.json(
    await reviewService.save(req.userId, req.params.productId, req.body),
  );
});

export default router;
