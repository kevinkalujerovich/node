"use strict";
var express = require("express");
var SocketAddress = require("net").SocketAddress;
var fs = require("fs");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.use(express.static("./public"));
http.listen(3030, function () { return console.log("escuchando..."); });
var mensajes = JSON.parse(fs.readFileSync("./bd.txt", "utf-8"));
var productos = [];
io.on("connection", function (socket) {
    console.log("alguien se está conectado...");
    io.sockets.emit("envioProductos", productos);
    socket.on("envioProducto", function (data) {
        productos.push(data);
        io.sockets.emit("envioProductos", productos);
    });
    socket.emit("mensajes", mensajes);
    socket.on("nuevo-mensaje", function (data) {
        mensajes.push(data);
        fs.writeFileSync("bd.txt", JSON.stringify(mensajes, null, "\t"));
        io.sockets.emit("mensajes", mensajes);
    });
});
