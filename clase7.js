import express from "express";
import fs from "fs";
const app = express();
const PORT = 8081;
let visitas = 0;

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));

app.get("/visitas", (req, res) => {
  res.send(`La cantidad de visitas es ${++visitas}`);
});

app.get("/", (req, res) => {
  console.log("request a get recibido!");
  // res.send('Vamos River!');
  res.json({ msg: "Ahora si funscasdasdiona!" });
});

app.get("/api/mensajes", (req, res) => {
  console.log("request a api/mensajes recibido!");
  const objRes = {
    msg: "Hola Mundosss!",
    saludos: 1000,
    error: false,
  };
  res.json(objRes);
});
const foo = async () => {
  try {
    const contenido = await fs.promises.readFile(
      `./archivos/productos.txt`,
      "utf-8"
    );
    console.log(contenido);
    console.log("Archivo leido!");
  } catch (err) {
    console.log(err);
  }
};

foo();
