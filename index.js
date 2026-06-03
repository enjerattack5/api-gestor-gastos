const mongoose=require("mongoose");
const app=require("./app");
 
const port = process.env.PORT || 4000;
 
//Conexion al gestor de mongodb (usa variable de entorno para Vercel)
const MONGODB_URI = process.env.MONGODB_URI;
 
mongoose.connect(MONGODB_URI)
.then(()=>console.log("Conectado a MongoDB"))
.catch(error=>console.log(error));
 
//Aquí escucha al puerto el server de express
app.listen(port, ()=>{
    console.log("**********************************")
    console.log("*******Api Rest appmovil**********")
    console.log("**********************************")
    console.log(`http://localhost:${port}/api/`);
})