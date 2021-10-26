const express = require("express");
const router = express.Router();
const { options } = require("../options/mariaDB");
const knex = require("knex")(options);
router.get("/", function (req, res) {
  res.render("main");
});
router.get("/listar", (req, res) => {
  try {
    knex
      .from("productos")
      .select("*")
      .then((data) => {
        res.json({
          response: data,
          message: "Success",
          status: 200,
        });
      })
      .catch((e) => {
        console.log("Error en Select:", e);
        knex.destroy();
      });
  } catch (error) {
    res.json({
      message: "Error",
      status: 404,
    });
  }
});

router.get("/listar/:id", (req, res) => {
  try {
    knex
      .from("productos")
      .select("*")
      .where("_id", "=", req.params.id)
      .then((data) => {
        data.length != 0
          ? res.json({
              response: data,
              message: "Success",
              status: 200,
            })
          : res.json({
              response: data,
              message: "No se encuentra un producto con ese id",
              status: 200,
            });
      })
      .catch((e) => {
        console.log("Error en Select:", e);
        knex.destroy();
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
    const obj = { ...req.body, timeStamp: Date.now() };
    knex("productos")
      .insert(obj)
      .then(() => {
        res.json({
          response: [],
          message: "Success",
          status: 200,
        });
      })
      .catch((e) => {
        console.log("Error en Insert:", e);
        knex.destroy();
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
    knex
      .from("productos")
      .where("_id", "=", req.params.id)
      .del()
      .then((data) => {
        data != 0
          ? res.json({
              message: "Success",
              status: 200,
            })
          : res.json({
              message: "No existe producto con el ID ingresado",
              status: 200,
            });
      })
      .catch((e) => {
        console.log("Error en Delete:", e);
        knex.destroy();
      });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});
router.put("/actualizar/:id", function (req, res) {
  try {
    knex
      .from("productos")
      .where("_id", "=", req.params.id)
      .update(req.body)
      .then((data) => {
        data != 0
          ? res.json({
              message: "Success",
              status: 200,
            })
          : res.json({
              message: "No existe producto con el ID ingresado",
              status: 200,
            });
      })
      .catch((e) => {
        console.log("Error en Update:", e);
        knex.destroy();
      });
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});
module.exports = router;
