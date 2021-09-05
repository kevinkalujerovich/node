import express from "express";
import Guardar from "./guardarform.js";

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
server.on("error", (error) => console.log("Error en servidor", error));

router.get("/listar", (req, res) => {
  productos.length === 0
    ? res.status(404).json({ error: "no hay productos cargados" })
    : res.json(productos);
});

router.post("/guardar", (req, res) => {
  let body = req.body;
  const producto = new Guardar(body.title, body.price, productos.length + 1);
  productos.push(producto);
  res.json({ operacion: "Objeto guardado" });
});

router.get("/listar/:id", (req, res) => {
  let params = req.params;
  const found = productos.find((element) => element.id === parseInt(params.id));
  !found
    ? res.status(404).json({ error: "producto no encontrado" })
    : res.json(found);
});

router.delete("/borrar", (req, res) => {
  let params = req.params;
  res.json(params);
  console.log("asdasdasda");
});
