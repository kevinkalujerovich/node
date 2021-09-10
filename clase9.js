const express = require("express");
const Guardar = require("./guardarform.js");
const multer = require("multer");
const app = express();
const PORT = 8080;
const router = express.Router();

const productos = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

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
    body.myFile,
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
  try {
    let params = parseInt(req.params.id);
    const obj = productos.find((elemento) => elemento.id === params);
    (obj.title = req.body.title),
      (obj.price = req.body.price),
      (obj.thumbnail = req.body.thumbnail);
    res.json(obj);
  } catch (error) {
    res.json({ error: "producto no encontrado, no se pudo modicar" });
  }
});
