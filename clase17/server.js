const express = require("express");
const handlebars = require("express-handlebars");

const { options } = require("./options/mariaDB");
const knex = require("knex")(options);
const { options2 } = require("./options/SQLite3");
const mensajesKnex = require("knex")(options2);

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
http.listen(8080, () => console.log("escuchando..."));
app.use("/productos", require("./router/productos"));
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
  mensajesKnex
    .select("*")
    .from("mensajes")
    .then((data) => {
      socket.emit("mensajes", data);
    })
    .catch((e) => {
      console.log("Error getting products: ", e);
      prodsKnex.destroy();
    });

  socket.on("nuevo-mensaje", (data) => {
    mensajesKnex("mensajes")
      .insert(data)
      .then(() => {
        console.log("Mensaje insertado");
      })
      .catch((e) => {
        console.log("Error en Insert message: ", e);
        mensajesKnex.destroy;
      });
    mensajesKnex
      .select("*")
      .from("mensajes")
      .then((data) => {
        socket.emit("mensajes", data);
      })
      .catch((e) => {
        console.log("Error getting products: ", e);
        prodsKnex.destroy();
      });
  });
});
