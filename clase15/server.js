const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/productos", require("./router/productos"));
app.use("/carrito", require("./router/carrito"));
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", PORT);
});
server.on("error", (error) => console.log("Error en servidor", error));
