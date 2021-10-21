const { Schema, model } = require("mongoose");

const productoSchema = new Schema({
  title: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  description: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  codigo: { type: Number, require: true, minLength: 0, maxLenghth: 100000 },
  thumbnail: { type: String, require: true, minLength: 0, maxLenghth: 500 },
  price: { type: Number, require: true, minLength: 0, maxLenghth: 100000 },
  stock: { type: Number, require: true, minLength: 0, maxLenghth: 1000 },
});

module.exports = model("Product", productoSchema);
