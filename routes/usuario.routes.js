const express=require("express");
const UsuarioController=require("../controllers/usuario.controller");

const api=express.Router();

api.post("/usuario/login",UsuarioController.login);
api.post("/usuario/register",UsuarioController.crearUsuario);
api.get("/usuario/buscar",UsuarioController.ObtenerDatos);

module.exports=api;