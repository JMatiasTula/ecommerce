import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

// Registro de clientes
router.post("/register", register);

// Login (admin o cliente)
router.post("/login", login);

export default router;
