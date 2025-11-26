import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas de la API
app.use("/api", productsRouter);
app.use("/auth", authRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("✅ API TechLab funcionando correctamente");
});

// Manejo de rutas no definidas (404)
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "❌ Ruta no encontrada",
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
