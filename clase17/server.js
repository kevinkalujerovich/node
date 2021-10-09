const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.use("/productos", require("./router/productos"));
http.listen(3030, () => console.log("escuchando..."));

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
