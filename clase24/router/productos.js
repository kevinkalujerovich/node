const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");

router.get("/", function (req, res) {
  const nombre = req.session.nombre;
  if (nombre != undefined) {
    res.render("main", { login: true, nombre: nombre });
  } else {
    res.render("main");
  }
});
router.get("/listar", (req, res) => {
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
});

router.get("/listar/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({
      response: [],
      message: "No se encuentra un producto con ese id",
    });
  }
  try {
    Producto.find({ _id: req.params.id }).then((data) => {
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
});

router.post("/guardar", (req, res) => {
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
});

router.delete("/borrar/:id", (req, res) => {
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
});
router.put("/actualizar/:id", function (req, res) {
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
});

router.get("/login", (req, res) => {
  res.render("main", { log: true });
});
router.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/productos");
});

router.get("/logout", (req, res) => {
  const nombre = req.session.nombre;
  req.session.destroy();
  res.render("main", { loguot: true, nombre: nombre });
});

module.exports = router;
