const express = require("express");
const Guardar = require("./guardarform.js");

const app = express();
const PORT = 8080;
const router = express.Router();

const productos = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);

app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});

router.get("/listar", (req, res) => {
  productos.length === 0
    ? res.json({ error: "no hay productos cargados" })
    : res.json(productos);
});

router.post("/guardar", (req, res) => {
  let body = req.body;
  const producto = new Guardar(
    body.title,
    body.price,
    body.thumbnail,
    productos.length + 1
  );
  productos.push(producto);
  res.json({ operacion: "Objeto guardado" });
});

router.get("/listar/:id", (req, res) => {
  let params = req.params;
  const found = productos.find((element) => element.id === parseInt(params.id));
  !found ? res.json({ error: "producto no encontrado" }) : res.json(found);
});

router.delete("/borrar/:id", (req, res) => {
  const params = parseInt(req.params.id);
  const element = productos.find((elemento) => elemento.id === params);
  !element
    ? res.json({ error: "producto no encontrado, no se pudo borrar" })
    : (productos.splice(productos.indexOf(element), 1), res.json(element));
});
router.put("/actualizar/:id", (req, res) => {
  let params = parseInt(req.params.id);
  if (productos.some((elemento) => elemento.id === params)) {
    productos.map((elemento) => {
      if (elemento.id === params) {
        (elemento.title = req.body.title),
          (elemento.price = req.body.price),
          (elemento.thumbnail = req.body.thumbnail);
      }
    });
    const obj = productos.find((elemento) => elemento.id === params);
    res.json(obj);
  } else {
    res.json({ error: "producto no encontrado, no se pudo modicar" });
  }
  res.json(obj);
});
