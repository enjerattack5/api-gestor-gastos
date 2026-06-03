const Persona = require("../models/persona.model");
const { messageGeneral } = require("../utils/messages");
const mongoose = require("mongoose");

class PersonaController {
    // CREAR: asignamos el usuarioId automáticamente
    static createPersona = async (req, res) => {
        try {
            const datos = req.body;
            datos.usuarioId = req.usuarioId; // 🔥 ASIGNAMOS EL USUARIO
            const newperson = await Persona.create(datos);
            messageGeneral(res, 201, true, newperson, "Gasto creado correctamente");
        } catch (error) {
            console.log(error);
            return messageGeneral(res, 400, false, null, error.message);
        }
    };

    // OBTENER TODOS: solo los del usuario autenticado
    static obtenerDatos = async (req, res) => {
        try {
            const buscarPersonas = await Persona.find({ usuarioId: req.usuarioId });
            res.status(200).json(buscarPersonas);
        } catch (error) {
            return messageGeneral(res, 400, false, null, error.message);
        }
    };

    // ESTADÍSTICAS: solo del usuario autenticado
    static obtenerEstadisticas = async (req, res) => {
        try {
            const resultadoAgregado = await Persona.aggregate([
                { $match: { usuarioId: new mongoose.Types.ObjectId(req.usuarioId) } },
                {
                    $group: {
                        _id: { $month: { $toDate: "$fecha" } },
                        total: { $sum: { $toDouble: "$monto" } }
                    }
                },
                { $sort: { "_id": 1 } }
            ]);
            const doceMeses = new Array(12).fill(0);
            resultadoAgregado.forEach(item => {
                if (item._id >= 1 && item._id <= 12) {
                    doceMeses[item._id - 1] = item.total;
                }
            });
            return messageGeneral(res, 200, true, doceMeses, "Estadísticas generadas correctamente");
        } catch (error) {
            console.log(error);
            return messageGeneral(res, 400, false, null, error.message);
        }
    };

    // ELIMINAR: solo si pertenece al usuario
    static deletePersona = async (req, res) => {
        try {
            const { id } = req.params;
            const eliminar = await Persona.findOneAndDelete({ _id: id, usuarioId: req.usuarioId });
            if (!eliminar) {
                return res.status(404).json({ message: "No encontrado o no autorizado" });
            }
            res.status(200).json(eliminar);
        } catch (error) {
            return messageGeneral(res, 400, false, null, error.message);
        }
    };

    // ACTUALIZAR: solo si pertenece al usuario
    static updatePersona = async (req, res) => {
        try {
            const { id } = req.params;
            const modPersona = req.body;
            const modificar = await Persona.findOneAndUpdate(
                { _id: id, usuarioId: req.usuarioId },
                modPersona,
                { new: true }
            );
            if (!modificar) {
                return res.status(404).json({ message: "No encontrado o no autorizado" });
            }
            res.status(200).send({ message: "Datos actualizados correctamente", modificar });
        } catch (error) {
            return messageGeneral(res, 400, false, null, error.message);
        }
    }
}

module.exports = PersonaController;