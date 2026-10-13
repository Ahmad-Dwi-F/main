import { Router } from "express";
import * as userService from "../services/userService.js";

const router = Router();

router.post("/register", async (req, res) => {
  res.status(201).json(await userService.register(req.body));
});

router.post("/login", async (req, res) => {
  res.json(await userService.login(req.body));
});

export default router;
