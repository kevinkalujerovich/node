const express = require("express");
const { SocketAddress } = require("net");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("./public"));

http.listen(3030, () => console.log("escuchando..."));

let productos = [];

io.on("connection", (socket) => {
  console.log("alguien se está conectado...");
  io.sockets.emit("envioProductos", productos);
  socket.on("envioProducto", (data) => {
    console.log(data);
    productos.push(data);
    io.sockets.emit("envioProductos", productos);
  });
});
