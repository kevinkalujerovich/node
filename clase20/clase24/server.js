const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bdconection = require("./bdconection");
const Producto = require("./models/producto");
const Mensaje = require("./models/mensajes");
bdconection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
http.listen(8080, () => console.log("escuchando..."));
app.use("/productos", require("./router/productos"));
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

io.on("connection", (socket) => {
  console.log("conectando a sockets");

  Producto.find().then((data) => {
    io.sockets.emit("envioProductos", data);
  });
  Mensaje.find().then((data) => {
    io.sockets.emit("mensajes", data);
  });

  socket.on("nuevo-mensaje", (data) => {
    Mensaje.insertMany(data)
      .then(() => {
        console.log("Mensaje guardado");
        Mensaje.find().then((data) => {
          io.sockets.emit("mensajes", data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
