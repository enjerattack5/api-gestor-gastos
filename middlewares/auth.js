// 🔥 NUEVO ARCHIVO: Middleware de autenticación simple
const authMiddleware = (req, res, next) => {
  // Leemos el ID del usuario desde el header 'X-User-Id'
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ message: "No autorizado: falta ID de usuario" });
  }
  // Guardamos el userId en la request para usarlo en los controladores
  req.usuarioId = userId;
  next();
};

module.exports = authMiddleware;