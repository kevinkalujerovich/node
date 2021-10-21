const { Schema, model } = require("mongoose");

const productoSchema = new Schema({
  name: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  description: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  price: { type: Number, require: true, minLength: 0, maxLenghth: 100000 },
});

module.exports = model("Product", productoSchema);
