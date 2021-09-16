const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));
const productos = [];
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("guardar.pug");
});

app.post("/", (req, res) => {
  let body = req.body;
  productos.push({ ...body, id: productos.length + 1 });
  res.render("guardar.pug");
});

app.get("/productos/vista", (req, res) => {
  res.render("productosvista.pug", { productos });
});

app.delete("/borrar/:id", (req, res) => {
  const params = parseInt(req.params.id);
  const element = productos.find((elemento) => elemento.id === params);
  if (element) {
    productos.splice(productos.indexOf(element), 1);
    res.json(element);
  } else {
    res.json({ error: "producto no encontrado, no se pudo borrar" });
  }
});
app.put("/actualizar/:id", (req, res) => {
  try {
    let params = parseInt(req.params.id);
    const obj = productos.find((elemento) => elemento.id === params);
    (obj.title = req.body.title),
      (obj.price = req.body.price),
      (obj.thumbnail = req.body.thumbnail),
      res.json(obj);
  } catch (error) {
    res.json({ error: "producto no encontrado, no se pudo modicar" });
  }
});
