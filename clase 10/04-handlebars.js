const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});

const productos = [];
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", function (req, res) {
  res.render("main", { guardar: true });
});
app.get("/productos/vista", (req, res) => {
  productos.length > 0
    ? res.render("main", { productos: productos, hayProductos: true })
    : res.render("main", { noHayProductos: true });
});

app.post("/", (req, res) => {
  let body = req.body;
  productos.push({ ...body, id: productos.length + 1 });
  res.render("main", { guardar: true });
  console.log(productos);
});

app.delete("/borrar/:id", (req, res) => {
  const params = parseInt(req.params.id);
  const element = productos.find((elemento) => elemento.id === params);
  try {
    productos.splice(productos.indexOf(element), 1), res.json(element);
  } catch (error) {
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
