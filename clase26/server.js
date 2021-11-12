const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
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
      console.log("Conectado a la base de datos de mongo local");
    }
  }
);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/mongo",
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const Producto = require("./models/producto");
const Mensaje = require("./models/mensajes");
const Session = require("./models/session");
const Registro = require("./models/resgistro");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
http.listen(8080, () => console.log("escuchando..."));
app.use("/productos", require("./router/productos"));

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, usuario, password, done) => {
      const user = await Registro.findOne({ usuario: usuario });
      if (user) {
        return done(null, false, console.log("ya existe este usuario"));
      } else {
        const obj = { usuario: usuario, password: password };
        Registro.insertMany(obj)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (error) {
            console.log(error);
          });
        done(null, obj);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, usuario, password, done) => {
      const user = await Registro.findOne({ usuario: usuario });
      if (!user) {
        return done(null, false, console.log("error no existe usuario"));
      }
      if (user.password != password) {
        return done(null, false, console.log("error en pasword"));
      }
      req.session.usuario = user;
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Registro.findById(id);
  done(null, user);
});

io.on("connection", (socket) => {
  console.log("conectando a sockets");
  Session.find().then((data) => {
    io.sockets.emit("login", data);
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
