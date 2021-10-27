const express = require("express");
const router = express.Router();

const Producto = require("../models/producto");
router.get("/", function (req, res) {
  res.render("main");
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
module.exports = router;
