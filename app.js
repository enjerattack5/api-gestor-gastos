//Son las librerias para el servidor y validadcion
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
//Importamos rutas
const PersonaRouter=require("./routes/persona.routes");
const UsuarioRouter=require("./routes/usuario.routes");
 
//Variable que obtiene los valores del express
const app=express();
 
 
//configurar los http para validar a traves del cors
app.use(cors({
  origin: ["https://app-gestor-de-gastos.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "X-User-Id"]
}));
//usar el bodyparser para pasar el JSON
app.use(bodyParser.json())
//Aqui van las rutas (usuario primero, para que login/register no sean bloqueados por el auth de persona)
app.use("/api",UsuarioRouter);
app.use("/api",PersonaRouter);
 
module.exports=app;