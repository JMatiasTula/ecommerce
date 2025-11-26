import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail, createUserModel } from "../models/user.model.js";

dotenv.config();

/**
 * Generar token JWT
 */
const generarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

/**
 * POST /auth/register
 * Registro de CLIENTES
 */
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios",
    });
  }

  try {
    // ¿Ya existe?
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({
        message: "Ya existe un usuario con ese email",
      });
    }

    // Creamos usuario (role = customer)
    const newUser = await createUserModel({
      email,
      password,
      role: "customer",
    });

    // Generamos token para que quede logueado
    const payload = {
      email: newUser.email,
      role: newUser.role,
    };

    const token = generarToken(payload);

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      token: `Bearer ${token}`,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({
      message: "Error interno al registrar usuario",
    });
  }
};

/**
 * POST /auth/login
 * Login de ADMIN o CLIENTE
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios",
    });
  }

  try {
    const adminEmail = process.env.AUTH_EMAIL;
    const adminPassword = process.env.AUTH_PASSWORD;

    // 1) Caso ADMIN
    if (email === adminEmail && password === adminPassword) {
      const payload = { email, role: "admin" };
      const token = generarToken(payload);

      return res.json({
        message: "Login admin correcto",
        token: `Bearer ${token}`,
        email,
        role: "admin",
      });
    }

    // 2) Caso CLIENTE: buscamos en colección usuarios
    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const payload = { email: user.email, role: user.role || "customer" };
    const token = generarToken(payload);

    return res.json({
      message: "Login correcto",
      token: `Bearer ${token}`,
      email: user.email,
      role: user.role || "customer",
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error interno al autenticar",
    });
  }
};
