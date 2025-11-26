import dotenv from "dotenv";

dotenv.config();

// Acá podrías en el futuro consultar una BD, Firebase, etc.
// Por ahora validamos contra variables de entorno.
export const validateUserCredentials = (email, password) => {
  const validEmail = process.env.AUTH_EMAIL;
  const validPassword = process.env.AUTH_PASSWORD;

  if (email === validEmail && password === validPassword) {
    // Podemos devolver un objeto "usuario" sencillo
    return {
      id: 1,
      email: validEmail,
      role: "admin",
    };
  }

  return null;
};
