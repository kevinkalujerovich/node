const express = require("express");
const { SocketAddress } = require("net");
const fs = require("fs");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("./public"));

http.listen(3030, () => console.log("escuchando..."));
const mensajes = JSON.parse(fs.readFileSync("./bd.txt", "utf-8"));
let productos = [];
io.on("connection", (socket) => {
  console.log("alguien se está conectado...");
  io.sockets.emit("envioProductos", productos);
  socket.on("envioProducto", (data) => {
    productos.push(data);
    io.sockets.emit("envioProductos", productos);
  });
  socket.emit("mensajes", mensajes);
  socket.on("nuevo-mensaje", (data) => {
    mensajes.push(data);
    fs.writeFileSync("bd.txt", JSON.stringify(mensajes, null, "\t"));
    io.sockets.emit("mensajes", mensajes);
  });
});
