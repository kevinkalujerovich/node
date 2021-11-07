const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const URIATLAS =
  "mongodb+srv://kevin:botellita123@cluster0.pgiyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://kevin:botellita123@cluster0.pgiyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
const Producto = require("./models/producto");
const Mensaje = require("./models/mensajes");
const Session = require("./models/session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
http.listen(8080, () => console.log("escuchando..."));
app.use("/productos", require("./router/productosAtlas"));

io.on("connection", (socket) => {
  console.log("conectando a sockets");
  Session.find().then((data) => {
    io.sockets.emit("hola", data);
  });
  Producto.find().then((data) => {
    io.sockets.emit("envioProductos", data);
  });
  Mensaje.find().then((data) => {
    io.sockets.emit("mensajes", data);
  });

  socket.on("nuevo-mensaje", (data) => {
    Mensaje.insertMany(data)
      .then(() => {
        console.log("Mensaje guardado");
        Mensaje.find().then((data) => {
          io.sockets.emit("mensajes", data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
