const ModelUsuario = require("../models/usuario.model");

class UsuarioController{
    static login = async (req, res) => {
  try {
    const { nombre, contraseña} = req.body;

    const usuario = await ModelUsuario.findOne({ nombre });

    if (!usuario) {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    if (usuario.contraseña !== contraseña) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

   return res.status(200).json({ message: "Login correcto", usuario });
  } catch (error) {
    console.log(error);
  }
};
 static crearUsuario = async(req,res)=>{
        try{
            const datos=req.body;
            const newusuario=await ModelUsuario.create(datos);
            res.status(200).json(newusuario);
        }catch(error){
            return console.log(error.error);
        }
    };
static ObtenerDatos=async(req,res)=>{
    try{
        const buscarUsuario=await ModelUsuario.find();
        res.status(200).json(buscarUsuario);
    }catch(error){
        return console.log(error.error)
    }
}


}
module.exports=UsuarioController;