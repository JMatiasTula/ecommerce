import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

let serviceAccount;

// 1️⃣ Intentar cargar desde variable de entorno (Render)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.log("🔐 Usando FIREBASE_SERVICE_ACCOUNT desde variable de entorno");
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // 2️⃣ Si no existe, usar archivo local (solo cuando trabajás en tu PC)
  console.log("📄 Usando firebase-service-account.json local");
  serviceAccount = require("../firebase-service-account.json");
}

// Inicializamos Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Firestore
const db = admin.firestore();

// Colecciones
const productsCollection = db.collection("productos");
const usersCollection = db.collection("usuarios");

export { db, productsCollection, usersCollection };
