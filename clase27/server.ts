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
import { logout } from "./controller/user";
import { Strategy as FacebookStrategy } from "passport-facebook";


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
  new FacebookStrategy(
    {
      clientID: "125727899514372",
      clientSecret: "b4537505bae78c5ed3fc13e87f9f489b",
      callbackURL: "http://localhost:8080/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function (accessToken, refreshToken, profile, cb) {
      const findOrCreateUser = function () {
        User.findOne({ facebookId: profile.id }, function (err, user) {
          if (err) {
            console.log("Error in SignUp: " + err);
            return cb(err);
          }
          if (user) {
            console.log("User login succesful");
            return cb(null, user);
          } else {
            const userData = {
              facebookId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
            }
            const newUser = new User(userData);
            newUser.save((err) => {
              if (err) {
                console.log("Error in Saving user: " + err);
                throw err;
              }
              console.log("User Registration succesful");
              return cb(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    }
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

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/faillogin" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/chat");
  }
);

app.get("/faillogin", (req, res) => {
  res.render("user/login-error", {});
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
