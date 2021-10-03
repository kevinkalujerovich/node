const express = require("express");
const router = express.Router();
const fs = require("fs");
const productosFull = JSON.parse(fs.readFileSync("./bdproductos.txt", "utf-8"));
const carritoFull = JSON.parse(fs.readFileSync("./bdcarrito.txt", "utf-8"));

router.get("/listar", (req, res) => {
  res.json(carritoFull);
});
router.get("/listar/:id", (req, res) => {
  let params = req.params;
  const found = carritoFull.find(
    (element) => element.id === parseInt(params.id)
  );
  !found ? res.json({ error: "no se encontro el producto" }) : res.json(found);
});

router.post("/agregar/:id_producto", (req, res) => {
  let params = req.params;
  const found = productosFull.find(
    (element) => element.id === parseInt(params.id_producto)
  );
  !found
    ? res.json({ error: "producto no encontrado, no se pudo agregar" })
    : carritoFull.push(found);
  fs.writeFileSync("./bdcarrito.txt", JSON.stringify(carritoFull, null, "\t"));
  res.json(carritoFull);
});
router.delete("/borrar/:id", (req, res) => {
  const params = parseInt(req.params.id);
  const element = carritoFull.find((elemento) => elemento.id === params);
  if (element) {
    carritoFull.splice(carritoFull.indexOf(element), 1);
    fs.writeFileSync(
      "./bdcarrito.txt",
      JSON.stringify(carritoFull, null, "\t")
    );
    res.json(carritoFull);
  } else {
    res.json({ error: "producto no encontrado, no se pudo borrar" });
  }
});
module.exports = router;
