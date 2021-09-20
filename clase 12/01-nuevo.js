const express = require("express");
const handlebars = require("express-handlebars");
const { SocketAddress } = require("net");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

http.listen(3030, () => console.log("escuchando..."));
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

let mensajes = [];

io.on("connection", (socket) => {
  console.log("alguien se está conectado...");
  io.sockets.emit("atodos", mensajes);
  socket.emit("mensajex", "hola!! este es un mensaje desde el servidor!");
  socket.on("notificacion", (data) => {
    mensajes.push({ socketId: socket.id, mensaje: data });
    io.sockets.emit("atodos", mensajes);
  });
  socket.on("mitexto", (data) => {
    io.sockets.emit("devuelvo", data);
  });
});
