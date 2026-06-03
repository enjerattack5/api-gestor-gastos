const express = require("express");
const PersonaController = require("../controllers/persona.controller");
// 🔥 CAMBIO: Importamos el middleware de autenticación
const authMiddleware = require("../middlewares/auth");

const api = express.Router();

// 🔥 CAMBIO: Aplicamos el middleware a TODAS las rutas de persona
api.use(authMiddleware);

// estas son las peticiones
api.post("/persona/create", PersonaController.createPersona);
api.get("/persona/buscar", PersonaController.obtenerDatos);
api.get("/persona/estadisticas", PersonaController.obtenerEstadisticas);
api.delete("/persona/eliminar/:id", PersonaController.deletePersona);
api.put("/persona/modificar/:id", PersonaController.updatePersona);

module.exports = api;