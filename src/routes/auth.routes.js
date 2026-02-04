import { Router } from "express";
import { register, login, logout, refresh } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { User } from "../models/User.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.userId, {
    attributes: ["id", "name", "email"]
  });
  res.json(user);
});

export default router;
