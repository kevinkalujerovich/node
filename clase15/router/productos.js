const express = require("express");
const router = express.Router();
const fs = require("fs");

const productosFull = JSON.parse(fs.readFileSync("./bdproductos.txt", "utf-8"));
const administrador = true;

router.get("/listar", (req, res) => {
  res.json(productosFull);
});

router.get("/listar/:id", (req, res) => {
  let params = req.params;
  const found = productosFull.find(
    (element) => element.id === parseInt(params.id)
  );
  !found
    ? res.json({ error: "no se pudo encontrar el producto" })
    : res.json(found);
});

router.post("/agregar", (req, res) => {
  if (administrador) {
    productosFull.push({
      ...req.body,
      id: productosFull.length + 1,
      timestamp: Date.now(),
    });
    fs.writeFileSync(
      "./bdproductos.txt",
      JSON.stringify(productosFull, null, "\t")
    );
    res.json(productosFull);
  } else {
    res.json({
      error: -1,
      description: `ruta http://localhost:8080/productos/agregar metodo POST no autorizada`,
    });
  }
});
router.put("/actualizar/:id", (req, res) => {
  if (administrador) {
    try {
      let params = parseInt(req.params.id);
      const obj = productosFull.find((elemento) => elemento.id === params);
      (obj.title = req.body.title),
        (obj.description = req.body.description),
        (obj.codigo = req.body.codigo),
        (obj.thumbnail = req.body.thumbnail),
        (obj.price = req.body.price),
        (obj.stock = req.body.stock),
        (obj.timestamp = Date.now()),
        fs.writeFileSync(
          "./bdproductos.txt",
          JSON.stringify(productosFull, null, "\t")
        );
      res.json(productosFull);
    } catch (error) {
      res.json({ error: "producto no encontrado, no se pudo modificar" });
    }
  } else {
    res.json({
      error: -1,
      description: `ruta http://localhost:8080/productos/actualizar/${req.params.id} metodo PUT no autorizada`,
    });
  }
});

router.delete("/borrar/:id", (req, res) => {
  if (administrador) {
    const params = parseInt(req.params.id);
    const element = productosFull.find((elemento) => elemento.id === params);
    if (element) {
      productosFull.splice(productosFull.indexOf(element), 1);
      fs.writeFileSync(
        "./bdproductos.txt",
        JSON.stringify(productosFull, null, "\t")
      );
      res.json(productosFull);
    } else {
      res.json({ error: "producto no encontrado, no se pudo borrar" });
    }
  } else {
    res.json({
      error: -1,
      description: `ruta http://localhost:8080/productos/borrar/${req.params.id} metodo DELETE no autorizada`,
    });
  }
});
module.exports = router;
