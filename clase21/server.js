const express = require("express");
const handlebars = require("express-handlebars");
require("dotenv").config();
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Producto = require("./models/producto");
const mongoose = require("mongoose");
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
          console.log(data);
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
  case "3": //fs
    const fs = require("fs");
    app.use("/productos", require("./router/productosfs"));
    io.on("connection", (socket) => {
      console.log("conectando a sockets desde fs");
      const productos = JSON.parse(fs.readFileSync("./db.txt", "utf-8"));
      io.sockets.emit("envioProductos", productos);
    });
    break;
  case "4": //Atlas
    const URIATLAS =
      "mongodb+srv://kevin:kevin@cluster0.pgiyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose.connect(
      URIATLAS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000,
      },
      (error) => {
        if (error) {
          throw "Error al conectarse a la base de datos";
        } else {
          console.log("Conectado a la base de datos de atlas");
        }
      }
    );

    app.use("/productos", require("./router/productosAtlas"));
    io.on("connection", (socket) => {
      console.log("conectando a sockets desde mongoose ");

      Producto.find().then((data) => {
        io.sockets.emit("envioProductos", data);
      });
    });
    break;
  case "5": //Firebase
    app.use("/productos", require("./router/productosFirebase"));

    const firebase = require("./firebase");

    async function foo() {
      try {
        const querySnapshot = await firebase.query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
          _id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          codigo: doc.data().codigo,
          price: doc.data().price,
          stock: doc.data().stock,
          thumbnail: doc.data().thumbnail,
        }));
        io.on("connection", (socket) => {
          console.log("conectando a sockets desde firebase");
          io.sockets.emit("envioProductos", response);
        });
      } catch (error) {
        console.log("Error!", error);
      }
    }
    foo();
    break;
  default:
    console.log("No existe opcion");
}
