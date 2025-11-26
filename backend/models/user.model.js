import { usersCollection } from "../config/firebase.js";

// Buscar usuario por email
export const findUserByEmail = async (email) => {
  const snapshot = await usersCollection
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

// Crear usuario nuevo
export const createUserModel = async ({ email, password, role = "customer" }) => {
  const now = new Date();

  const docRef = await usersCollection.add({
    email,
    password,      // (para mejor seguridad podríamos luego encriptar)
    role,
    createdAt: now,
  });

  const doc = await docRef.get();
  return { id: docRef.id, ...doc.data() };
};
