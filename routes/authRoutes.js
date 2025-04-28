import express from "express";
import auth from "../middleware/auth.js";
import { register, login, logout } from "../controllers/authController.js";

// Init router
const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);

export default router;
