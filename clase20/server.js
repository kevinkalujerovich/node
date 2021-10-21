const mongoose = require("mongoose");
const Producto = require("./models/producto");
const URI = "mongodb://localhost:27017/mongo";
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000,
  },
  (error) => {
    if (error) {
      throw "Error al conectarse a la base de datos";
    } else {
      console.log("Conectado a la base de datos...");
    }
  }
);
const objProducto = new Producto({
  name: "laptop",
  description: "lenovo thinkpad x1 carbon 6th generation",
  price: 1300.99,
});
Producto.insertMany(objProducto, (error) => {
  if (error) {
    throw "Error al grabar estudiantes " + error;
  } else {
    console.log(`Estudiantes grabados...`);
  }
});

Producto.find().then((data) => {
  console.log(data);
});
