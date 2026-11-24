import { Router } from "express";
import * as userService from "../services/userService.js";

const router = Router();

router.post("/register", async (req, res) => {
  res.status(201).json(await userService.register(req.body));
});

router.post("/login", async (req, res) => {
  res.json(await userService.login(req.body));
});

router.get("/verifikasi-email", async (req, res) => {
  res.json(await userService.verifyEmailToken(req.query.token));
});

router.get("/verifikasi-email/:token", async (req, res) => {
  res.json(await userService.verifyEmailToken(req.params.token));
});

export default router;
