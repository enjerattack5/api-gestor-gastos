const mongoose = require("mongoose");

const PersonaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        uppercase: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    nomuser: {
        type: String
    },

    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("persona", PersonaSchema);