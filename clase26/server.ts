import express, { Application } from "express";
import http from "http";
import type { Socket } from "socket.io";
import vistasRoutes from "./routes/vistas";
import handlebars from "express-handlebars";
import { addMensaje } from "./controller/chat";
import session from 'express-session';
import mongoose from "mongoose";
import redis from "redis";
import passport from "passport";
import { UserModel as User } from "./model/user";
import { login, logout, register } from "./controller/user";
import { Strategy as LocalStrategy } from "passport-local";


const app: Application = express();
// const http = require('http').Server(app);
const http_server = new http.Server(app);
const io = require("socket.io")(http_server);
const client = redis.createClient();
const RedisStore = require('connect-redis')(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: client,
    ttl: 600 //60s*10
  }),
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    login,
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    register,
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



const PORT: number = 8080;

const server = http_server
  .listen(PORT, () => {
    mongoose
      .connect("mongodb://127.0.0.1/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((c) => console.log("Se conecto correctamente"))
      .catch((e) => console.log(e));
  })
  .on("error", (error) =>
    console.log(`Se produjo un error al iniciar el servidor ${error}`)
  );

const isEqualHelperHandlerbar = function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
};

app.engine(
  "hbs", //nombre referencia a la plantilla (se usa luego en set)
  handlebars({
    //funcion de configuracion handlebars
    extname: ".hbs", // Extension a utilizar en lugar de .handlebars(por defecto)
    defaultLayout: "index.hbs", //plantilla principal
    layoutsDir: __dirname + "/views/layouts", // ruta a la plantilla principal
    partialsDir: __dirname + "/views/partials/", //ruta a las plantillas parciales
    helpers: {
      if_equal: isEqualHelperHandlerbar,
    },
  })
);

//Establecemos el motor de plantillas que se utiliza
app.set("view engine", "hbs");
//Establecemos directorio donde se encuentran los archivos de plantilla
app.set("views", "./views");

app.use("/styles", express.static(__dirname + "/public/styles"));

//Cargar rutas
// app.use("/user", userRoutes);
app.get("/user/login", (req, res) =>{
  res.render("user/login",{});
});
app.post(
  "/user/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    res.redirect("/chat");
  }
);

app.get("/faillogin", (req, res) => {
  res.render("user/login-error", {});
});

/* --------- REGISTER ---------- */
app.get("/user/register", (req, res) => {
  res.render("user/register");
});

app.post(
  "/user/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    res.redirect("/chat");
  }
);

app.get("/failregister", (req, res) => {
  res.render("register-error", {});
});

app.get("/user/logout",logout);


app.use("/", vistasRoutes);
app.use((req, res, next) => {
  res.status(404).send("Error al obtener metodo");
});

io.on("connection", (socket: Socket) => {
  socket.on("agregar_mensaje", (data) => {
    const { email, nombre, apellido, edad, alias, avatar, mensaje } = data;
    addMensaje(
      email,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
      mensaje
    ).then((mensaje_agregado) => io.emit("mensaje_agregado", mensaje_agregado));
  });
});
