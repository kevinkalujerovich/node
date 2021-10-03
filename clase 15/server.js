const express = require("express");

const app = express();
const PORT = 8080;
const productos = express.Router();
const carrito = express.Router();

const administrador = true;
const productosFull = [
  {
    title: "zapatillas",
    description: "zapatillas deportivas",
    codigo: "1",
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/old_glasses_people_man_grandfather_avatar_beard-512.png",
    price: "100",
    stock: "1",
    id: 1,
    timestamp: 1633020904612,
  },
  {
    title: "remera",
    description: "remera deportiva",
    codigo: "1",
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/old_glasses_people_man_grandfather_avatar_beard-512.png",
    price: "100",
    stock: "1",
    id: 2,
    timestamp: 1633020904612,
  },
];
const carritoFull = [
  {
    title: "remera",
    description: "remera deportiva",
    codigo: "1",
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/old_glasses_people_man_grandfather_avatar_beard-512.png",
    price: "100",
    stock: "1",
    id: 3,
    timestamp: 1633020904612,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", productos);
app.use("/carrito", carrito);
app.use(express.static("public"));
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", PORT);
});
server.on("error", (error) => console.log("Error en servidor", error));

productos.get("/listar", (req, res) => {
  res.json(productosFull);
});

productos.get("/listar/:id", (req, res) => {
  let params = req.params;
  const found = productosFull.find(
    (element) => element.id === parseInt(params.id)
  );
  !found
    ? res.json({ error: "no se pudo encontrar el producto" })
    : res.json(found);
  res.json({
    error: -1,
    description: `ruta http://localhost:8080/productos/listar/${req.params.id} metodo GET no autorizada`,
  });
});

productos.post("/agregar", (req, res) => {
  if (administrador) {
    productosFull.push({
      ...req.body,
      id: productosFull.length + 1,
      timestamp: Date.now(),
    });
    res.json(productosFull);
  } else {
    res.json({
      error: -1,
      description: `ruta http://localhost:8080/productos/agregar metodo POST no autorizada`,
    });
  }
});
productos.put("/actualizar/:id", (req, res) => {
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

productos.delete("/borrar/:id", (req, res) => {
  if (administrador) {
    const params = parseInt(req.params.id);
    const element = productosFull.find((elemento) => elemento.id === params);
    if (element) {
      productosFull.splice(productosFull.indexOf(element), 1);
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

carrito.get("/listar", (req, res) => {
  res.json(carritoFull);
});

carrito.get("/listar/:id", (req, res) => {
  let params = req.params;
  const found = carritoFull.find(
    (element) => element.id === parseInt(params.id)
  );
  !found ? res.json({ error: "no se encontro el producto" }) : res.json(found);
});

carrito.post("/agregar/:id_producto", (req, res) => {
  let params = req.params;
  const found = productosFull.find(
    (element) => element.id === parseInt(params.id_producto)
  );
  !found
    ? res.json({ error: "producto no encontrado, no se pudo agregar" })
    : carritoFull.push(found);
  res.json(carritoFull);
});
carrito.delete("/borrar/:id", (req, res) => {
  const params = parseInt(req.params.id);
  const element = carritoFull.find((elemento) => elemento.id === params);
  if (element) {
    carritoFull.splice(carritoFull.indexOf(element), 1);
    res.json(carritoFull);
  } else {
    res.json({ error: "producto no encontrado, no se pudo borrar" });
  }
});
