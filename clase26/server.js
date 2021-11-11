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
      // or whatever you want to use
      usernameField: "usuario", // define the parameter in req.body that passport can use as username and password

      passReqToCallback: true,
    },
    function (usuario, password, done) {
      console.log(usuario.body);
      Registro.findOne({ usuario: usuario.body.usuario })
        .then(function (user) {
          if (user) {
            return done(null, false, console.log("usuario ya existente"));
          } else {
            const obj = {
              usuario: usuario.body.usuario,
              password: usuario.body.password,
            };
            Registro.insertMany(obj, (error) => {
              if (error) {
                throw "Error al grabar producto " + error;
              } else {
                console.log({
                  response: obj,
                  message: "Success",
                  status: 200,
                });
              }
            });
            return done(null, console.log("se agrego nuevo usuario"));
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  )
);
/* passport.use(
  "registro",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, usuario, password, done) {
      Registro.findOne({ usuario: usuario })
        .then(function (user) {
          if (user) {
            return done(null, false, console.log("usuario ya existente"));
          } else {
            const obj = { usuario: usuario, password: password };
            Registro.insertMany(obj, (error) => {
              if (error) {
                throw "Error al grabar producto " + error;
              } else {
                res.json({
                  response: obj,
                  message: "Success",
                  status: 200,
                });
              }
            });
            return done(null, console.log("error usuario existente"));
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  )
); */

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, usuario, password, done) {
      Registro.findOne({ usuario: usuario })
        .then(function (user) {
          if (user) {
            if (password === user.password) {
              return done(null, console.log("login correcto"));
            } else {
              return done(null, false, console.log("error de password"));
            }
          } else {
            return done(null, false, console.log("error usuario existente"));
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  let usuario = obtenerUsuarioId(usuarios, id);
  done(null, usuario);
});

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
