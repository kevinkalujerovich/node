const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/mongo";
const conect = () => {
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
        console.log("Conectado a la base de datos");
      }
    }
  );
};

module.exports = conect;
