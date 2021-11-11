const { Schema, model } = require("mongoose");

const registroSchema = new Schema({
  usuario: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  password: { type: String, require: true, minLength: 3, maxLenghth: 20 },
});

module.exports = model("Usuarios", registroSchema);
