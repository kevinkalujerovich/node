const express = require("express");
const app = express();
const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
http.listen(8080, () => console.log("escuchando..."));

app.use("/productos", require("./router/productos"));
let mensajes = [];

io.on("connection", (socket) => {
  console.log("alguien se está conectado...");
  knex
    .from("productos")
    .select("*")
    .then((data) => {
      io.sockets.emit("envioProductos", JSON.parse(JSON.stringify(data)));
      return;
    })
    .catch((e) => {
      console.log("Error en Select:", e);
      knex.destroy();
    });

  socket.on("envioProducto", (data) => {
    console.log(data);
  });
  socket.emit("mensajes", mensajes);
  socket.on("nuevo-mensaje", (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});
