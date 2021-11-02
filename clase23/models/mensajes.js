const { Schema, model } = require("mongoose");

const mensajeSchema = new Schema({
  author: {
    id: { type: String, require: true, minLength: 3, maxLenghth: 20 },
    nombre: { type: String, require: true, minLength: 3, maxLenghth: 20 },
    apellido: { type: String, require: true, minLength: 0, maxLenghth: 100 },
    edad: { type: Number, require: true, minLength: 0, maxLenghth: 100 },
    alias: { type: String, require: true, minLength: 0, maxLenghth: 100 },
    avatar: { type: String, require: true, minLength: 0, maxLenghth: 100 },
    fecha: { type: String, require: true, minLength: 0, maxLenghth: 100 },
    hora: { type: String, require: true, minLength: 0, maxLenghth: 100 },
  },
  mensaje: { type: String, require: true, minLength: 0, maxLenghth: 100 },
});

module.exports = model("Mensajes", mensajeSchema);
