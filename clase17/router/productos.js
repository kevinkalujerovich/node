const express = require("express");
const router = express.Router();
const { options } = require("../options/mariaDB");
const knex = require("knex")(options);
router.get("/listar", (req, res) => {
  knex
    .from("productos")
    .select("*")
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log("Error en Select:", e);
      knex.destroy();
    });
});

router.get("/listar/:id", (req, res) => {
  knex
    .from("productos")
    .select("id", "title", "description")
    .where("id", "=", req.params.id)
    .then((data) => {
      res.json(data);
      socket.emit("envioProducto", envio);
    })
    .catch((e) => {
      console.log("Error en Select:", e);
      knex.destroy();
    });
});
router.post("/guardar", (req, res) => {
  const obj = { ...req.body, timeStamp: Date.now() };
  knex("productos")
    .insert(obj)
    .then(() => {
      console.log("Filas insertadas!");
    })
    .catch((e) => {
      console.log("Error en Insert:", e);
      knex.destroy();
    });
  res.json("guardado");
});
router.delete("/borrar/:id", (req, res) => {
  knex
    .from("productos")
    .where("id", "=", req.params.id)
    .del()
    .then(() => {
      console.log("Filas borradas!");
    })
    .catch((e) => {
      console.log("Error en Delete:", e);
      knex.destroy();
    });
  res.json("se elimino el producto de id " + req.params.id);
});
module.exports = router;
