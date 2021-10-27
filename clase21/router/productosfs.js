const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {
  res.render("main");
});
router.get("/listar", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./db.txt", "utf-8"));
    res.json({
      response: data,
      message: "Success",
      status: 200,
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
    const data = JSON.parse(fs.readFileSync("./db.txt", "utf-8"));
    const params = parseInt(req.params.id);
    const element = data.filter((elemento) => elemento._id === params);
    if (element) {
      res.json({
        response: element,
        message: "Success",
        status: 200,
      });
    } else {
      res.json({
        message: "No se encontro el producto",
        status: 200,
      });
    }
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});

router.post("/guardar", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./db.txt", "utf-8"));
    data.push({ ...req.body, _id: data.length + 1 });
    fs.writeFileSync("./db.txt", JSON.stringify(data));
    res.json({
      message: "Success",
      status: 200,
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
    const data = JSON.parse(fs.readFileSync("./db.txt", "utf-8"));
    const params = parseInt(req.params.id);
    const element = data.find((elemento) => elemento._id === params);
    if (element) {
      data.splice(data.indexOf(element), 1);
      fs.writeFileSync("./db.txt", JSON.stringify(data));
      res.json({
        message: "Success",
        status: 200,
      });
    } else {
      res.json({
        message: "ID de producto no existente",
        status: 200,
      });
    }
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});

router.put("/actualizar/:id", function (req, res) {
  try {
    let params = parseInt(req.params.id);
    const data = JSON.parse(fs.readFileSync("./db.txt", "utf-8"));
    const obj = data.find((elemento) => elemento._id === params);
    if (obj) {
      (obj.title = req.body.title),
        (obj.description = req.body.description),
        (obj.codigo = req.body.codigo),
        (obj.thumbnail = req.body.thumbnail),
        (obj.price = req.body.price),
        (obj.stock = req.body.stock);
      fs.writeFileSync("./db.txt", JSON.stringify(data));
      res.json({
        message: "Success",
        status: 200,
      });
    } else {
      res.json({
        message: "ID de producto no existente",
        status: 200,
      });
    }
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});
module.exports = router;
