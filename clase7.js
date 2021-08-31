import express from "express";
import fs from "fs";
const app = express();
const PORT = 8081;
let visitas = 0;
let visitas2 = 0;

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));

app.get("/items", (req, res) => {
  console.log("request a get recbido!");
  const data = JSON.parse(fs.readFileSync("./archivos/productos.txt", "utf-8"));
  const obj = { items: data, cantidad: data.length };
  res.json(obj);
  console.log("El puerto de conexion es " + PORT);
  ++visitas;
});
app.get("/items-random", (req, res) => {
  const aleatorio = (minimo, maximo) => {
    return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
  };
  console.log("request a get recbido!");
  const data = JSON.parse(fs.readFileSync("./archivos/productos.txt", "utf-8"));
  const obj = { item: data[aleatorio(1, data.length)] };
  res.json(obj);
  console.log("El puerto de conexion es " + PORT);
  ++visitas2;
});
app.get("/visitas", (req, res) => {
  const obj = {
    visitas: { items: "/items", item: visitas },
    visitas2: { items: "/items-random", item: visitas2 },
  };
  res.json(obj);
  console.log("El puerto de conexion es " + PORT);
});
