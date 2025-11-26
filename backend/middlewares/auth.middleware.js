import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Esperamos header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token no proporcionado",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(400).json({
      message: "Formato de token inválido",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos los datos del usuario en la request
    req.user = decoded;

    // Continuamos
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);

    return res.status(403).json({
      message: "Token inválido o expirado",
    });
  }
};

export default authMiddleware;
