const { Schema, model } = require("mongoose");

const mensajeSchema = new Schema({
  usuario: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  mensaje: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  fecha: { type: String, require: true, minLength: 0, maxLenghth: 100 },
  hora: { type: String, require: true, minLength: 0, maxLenghth: 100 },
});

module.exports = model("Mensajes", mensajeSchema);
