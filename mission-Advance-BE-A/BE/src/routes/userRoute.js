import { Router } from "express";
import * as userService from "../services/userService.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/me", async (req, res) => {
  res.json(await userService.getById(req.userId));
});

router.put("/me", async (req, res) => {
  res.json(await userService.updateProfile(req.userId, req.body));
});

router.delete("/me", async (req, res) => {
  await userService.deleteAccount(req.userId);
  res.sendStatus(204);
});

router.patch("/me/avatar", async (req, res) => {
  res.json(await userService.setAvatar(req.userId, req.body));
});

export default router;
