import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/products → lista todos los productos (público)
router.get("/products", getAllProducts);

// GET /api/products/:id → trae un producto por ID (público)
router.get("/products/:id", getProductById);

// POST /api/products/create → crea un nuevo producto (PROTEGIDO)
router.post("/products/create", authMiddleware, createProduct);

// PUT /api/products/:id → actualiza un producto (PROTEGIDO)
router.put("/products/:id", authMiddleware, updateProduct);

// DELETE /api/products/:id → elimina un producto (PROTEGIDO)
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
