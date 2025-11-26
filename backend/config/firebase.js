import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Cargamos el archivo de credenciales del service account
const serviceAccount = require("../firebase-service-account.json");

// Inicializamos la app de Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Obtenemos la referencia a Firestore
const db = admin.firestore();

// Colección de productos
const productsCollection = db.collection("productos");

// Colección de usuarios
const usersCollection = db.collection("usuarios");

export { db, productsCollection, usersCollection };
