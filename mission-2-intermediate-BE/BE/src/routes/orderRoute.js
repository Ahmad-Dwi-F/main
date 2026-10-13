import { Router } from "express";
import * as orderService from "../services/orderService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  res.json(await orderService.listByUser(req.userId));
});

router.post("/", async (req, res) => {
  res.status(201).json(await orderService.create(req.userId, req.body));
});

router.patch("/:id", async (req, res) => {
  res.json(
    await orderService.updateStatus(
      req.userId,
      req.params.id,
      req.body?.status,
    ),
  );
});

export default router;
