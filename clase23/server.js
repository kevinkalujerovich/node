const express = require("express");
const handlebars = require("express-handlebars");
const util = require("util");
const { normalize, schema } = require("normalizr");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const router = require("./router/rutas");
const Producto = require("./models/producto");
const Mensaje = require("./models/mensajes");
const mongoose = require("mongoose");
const { database } = require("faker/locale/en_BORK");
const mensajes = require("./models/mensajes");
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
      console.log("Conectado a la base de datos");
    }
  }
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.use("/productos", router.set());
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

io.on("connection", (socket) => {
  console.log("conectando a sockets");

  Producto.find().then((data) => {
    io.sockets.emit("envioProductos", data);
  });
  Mensaje.find().then((data) => {
    const blogPost = {
      id: 1,
      title: "My blogspot",
      description: "Short description",
      content: "Hello word",
      author: {
        id: 1,
        name: "John Doe",
      },
      comments: [
        {
          id: 1,
          author: "Rob",
          content: "Nice post!",
        },
        {
          id: 2,
          author: "Jane",
          content: "I totally agree with you",
        },
      ],
    };

    // defino el esquema de los usuarios (o comentadores)
    const user = new schema.Entity("users");

    // defino el esquema de los comentarios, que son realizados por un usuario
    const comment = new schema.Entity("comments", {
      commenter: user,
    });

    // defino el esquema de los articulos, que tienen un autor y una cantidad de comentarios
    const article = new schema.Entity("articles", {
      author: user,
      comments: [comment],
    });

    // creamos el objeto normalizado
    const normalizedData = normalize(blogPost, article);
    print(normalizedEmpresa);
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
app.get("*", router.notFound);
app.post("*", router.notFound);
app.put("*", router.notFound);
app.delete("*", router.notFound);
