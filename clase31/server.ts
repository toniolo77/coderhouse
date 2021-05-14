import express, { Application } from "express";
import http from "http";
import compression from "compression";
import type { Socket } from "socket.io";
import vistasRoutes from "./routes/vistas";
import userRoutes from "./routes/user";
import handlebars from "express-handlebars";
import { addMensaje } from "./controller/chat";
import session from "express-session";
import mongoose from "mongoose";
import redis from "redis";
import passport from "passport";
import { UserModel as User } from "./model/user";
import { login } from "./controller/user";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { fork } from "child_process";
import Logger from "./loggin/loggin";
const MongoStore = require("connect-mongo");

// const MongoStore = connectMongo(session);
export const initServer = (
  PORT,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET
) => {
  const app: Application = express();
  const http_server = new http.Server(app);
  const io = require("socket.io")(http_server);
  const client = redis.createClient();
  const RedisStore = require("connect-redis")(session);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost/sesiones",
      }),
      secret: "secreto",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression());

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: `http://localhost:${PORT}/auth/facebook/callback`,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      login
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

  const server = http_server
    .listen(PORT, () => {
      mongoose
        .connect("mongodb://127.0.0.1/ecommerce", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((c) => Logger.info("Se conecto correctamente"))
        .catch((e) => Logger.error(e));
    })
    .on("error", (error) =>
      Logger.error(`Se produjo un error al iniciar el servidor ${error}`)
    );

  app.engine(
    "hbs", //nombre referencia a la plantilla (se usa luego en set)
    handlebars({
      //funcion de configuracion handlebars
      extname: ".hbs", // Extension a utilizar en lugar de .handlebars(por defecto)
      defaultLayout: "index.hbs", //plantilla principal
      layoutsDir: __dirname + "/views/layouts", // ruta a la plantilla principal
      partialsDir: __dirname + "/views/partials/", //ruta a las plantillas parciales
    })
  );

  //Establecemos el motor de plantillas que se utiliza
  app.set("view engine", "hbs");
  //Establecemos directorio donde se encuentran los archivos de plantilla
  app.set("views", "./views");

  app.use("/styles", express.static(__dirname + "/public/styles"));

  //Cargar rutas Facebook
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/user/faillogin" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/chat");
    }
  );

  app.get("/randoms", (req, res) => {
    const cant = req.query.cant || 10000000;
    const compute = fork("./calcular.ts");
    compute.send(cant);
    compute.on("message", (numbers) => {
      res.json(numbers);
    });
  });

  app.use("/user", userRoutes);
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
      ).then((mensaje_agregado) =>
        io.emit("mensaje_agregado", mensaje_agregado)
      );
    });
  });
};
