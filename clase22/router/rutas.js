const express = require("express");
const router = express.Router();
const api = require("../api/apiProductos");

const notFound = (req, res) => {
  let { url, method } = req;
  res.send(
    `La ruta <span style="color:blue">${method}</span><span style="color:red">${url}</span> no fue definida`
  );
};

function set() {
  router.get("/", api.index);
  router.get("/listar", api.listar);
  router.get("/listar/:id", api.listarId);
  router.post("/guardar", api.guardar);
  router.delete("/borrar/:id", api.borrar);
  router.put("/actualizar/:id", api.actualizar);
  router.get("/vista-test", api.vistaTest);
  return router;
}

module.exports = {
  set,
  notFound,
};
