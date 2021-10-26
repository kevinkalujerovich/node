const express = require("express");
const handlebars = require("express-handlebars");
require("dotenv").config();
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
http.listen(8080, () => console.log("escuchando..."));

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
switch (process.env.VARIABLE) {
  case "0": //Mongo Local
    const Producto = require("./models/producto");
    const mongoose = require("mongoose");
    const URI = "mongodb://localhost:27017/mongo";
    mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000,
      },
      (error) => {
        if (error) {
          throw "Error al conectarse a la base de datos";
        } else {
          console.log("Conectado a la base de datos de mongoose");
        }
      }
    );
    app.use("/productos", require("./router/productos"));
    io.on("connection", (socket) => {
      console.log("conectando a sockets desde mongoose ");

      Producto.find().then((data) => {
        io.sockets.emit("envioProductos", data);
      });
    });
    break;
  case "1": //Maria DB
    const { options } = require("./options/mariaDB");
    const knex = require("knex")(options);
    app.use("/productos", require("./router/productosMariaDB"));
    io.on("connection", (socket) => {
      console.log("conectando a sockets desde MariaDB");
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
    });
    break;
  case "2": //SQLite3
    const { options2 } = require("./options/sqlite3");
    const productosKnex = require("knex")(options2);
    app.use("/productos", require("./router/productosSQLite3"));
    io.on("connection", (socket) => {
      console.log("conectando a sockets desde SQLite3");
      productosKnex
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
    });
    break;
  default:
    console.log("No existe opcion");
}
