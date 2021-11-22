const express = require("express");
const router = express.Router();
const path = require("path");
const Producto = require("../models/producto");
const passport = require("passport");

const { fork } = require("child_process");
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
  req.session.destroy();
  res.redirect("/");
});

router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/registroerror.html",
    successRedirect: "/productos/login",
    session: false,
  })
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: "email",
  })
);

router.get(
  "/auth/facebook/datos",
  passport.authenticate("facebook", {
    successRedirect: "/",
  })
);

router.get("/datos", (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    res.json({ user });
  } else {
    res.redirect("/index.html");
  }
});

router.get("/info", (req, res) => {
  const datos = `Sistema operativo :${
    process.platform
  },Carpeta corriente:${process.cwd()},Process id:${
    process.pid
  },path de ejecucuon:${process.env.path},Version de Node: ${
    process.version
  },Uso de memoria:{
    rss:${process.memoryUsage().rss},
    heapTotal:${process.memoryUsage().heapTotal},
    external:${process.memoryUsage().external},
    arrayBuffers:${process.memoryUsage().arrayBuffers}
  },Argumentos de entrada:${process.argv}`;
  res.json(datos);
});

router.get("/randoms", (req, res) => {
  const cantidad = parseInt(req.query.cant) || 100000000;
  const computo = fork("./computo.js");
  computo.send(cantidad);
  computo.on("message", (sum) => res.send(sum));
  console.log("Es no bloqueante!");
});

module.exports = router;
