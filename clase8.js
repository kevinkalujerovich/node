import express from "express";
import Guardar from "./guardar.js";
//import productos from "./productos.js";
const app = express();
const PORT = 8080;
const productos = [];

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/productos/listar", (req, res) => {
  if (productos.length === 0) {
    res.status(404).json({ error: "no hay productos cargados" });
  }
  res.json(productos);
});

app.get("/api/productos/listar/:id", (req, res) => {
  let params = req.params;
  const found = productos.find((element) => element.id === parseInt(params.id));
  if (!found) {
    res.status(404).json({ error: "producto no encontrado" });
  }
  res.json(found);
});

app.post("/api/productos/guardar", (req, res) => {
  let body = req.body;
  const producto = new Guardar(
    body.title,
    body.price,
    body.thumbnail,
    productos.length + 1
  );
  productos.push(producto);
  res.json(producto);
});
