const express = require("express");
const router = express.Router();
const path = require("path");
const Producto = require("../models/producto");
const Registro = require("../models/resgistro");
const passport = require("passport");

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
  res.sendFile(path.resolve(__dirname, "../public/login.html"));
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/loginerror.html",
    successRedirect: "/",
  })
);

router.delete("/logout", (req, res) => {
  const nombre = req.session.usuario.usuario;
  req.session.destroy();
  res.json(nombre);
});

router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/registroerror.html",
    successRedirect: "/",
    session: false,
  })
);

module.exports = router;
