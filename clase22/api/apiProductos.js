const mongoose = require("mongoose");
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
      console.log("Conectado a la base de datos");
    }
  }
);
const Producto = require("../models/producto");
const generador = require("../generador/productos");
const fakebd = require("../models/fakebd");

const index = (req, res) => {
  res.render("main");
};

const listar = (req, res) => {
  try {
    Producto.find().then((data) => {
      res.json({
        response: data,
        message: "Success",
        status: 200,
      });
    });
  } catch (error) {
    res.json({
      message: "Error",
      status: 404,
    });
  }
};

const listarId = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({
      response: [],
      message: "No se encuentra un producto con ese id",
    });
  }
  try {
    Producto.find({ _id: req.params.id }).then((data) => {
      console.log(data);
      res.json({
        response: data,
        message: "Success",
        status: 200,
      });
    });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
};

const guardar = (req, res) => {
  try {
    const obj = { ...req.body };
    Producto.insertMany(obj, (error) => {
      if (error) {
        throw "Error al grabar producto " + error;
      } else {
        res.json({
          response: obj,
          message: "Success",
          status: 200,
        });
      }
    });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
};

const borrar = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({
      response: [],
      message: "No se encuentra un producto con ese id",
    });
  }
  try {
    Producto.deleteMany({ _id: req.params.id }).then(() => {
      res.json({
        message: "Success",
        status: 200,
      });
    });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
};
const actualizar = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({
      response: [],
      message: "No se encuentra un producto con ese id",
    });
  }
  const obj = req.body;
  try {
    Producto.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: obj.title,
          description: obj.description,
          codigo: obj.codigo,
          thumbnail: obj.thumbnail,
          price: obj.price,
          stock: obj.stock,
        },
      }
    ).then(() => {
      res.json({
        message: "Success",
        status: 200,
      });
    });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
};

const vistaTest = (req, res) => {
  try {
    const cantidad = req.query.cant || 10;
    for (let i = 0; i < cantidad; i++) {
      fakebd.productos.push(generador.producto());
    }
    res.render("main", { vistaTest: true, productos: fakebd.productos });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
};

module.exports = {
  listar,
  listarId,
  guardar,
  borrar,
  actualizar,
  index,
  vistaTest,
};
