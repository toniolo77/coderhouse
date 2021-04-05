import express, { Application } from "express";
import http from "http";
import productoRoutes from "./routes/producto";

const app: Application = express();
const http_server = new http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas

const PORT = 8080;

//Cargar rutas
app.use("/producto", productoRoutes);

const server = http_server
  .listen(PORT, () => {
    console.log("Inicio server")
  })
  .on("error", (error) =>
    console.log(`Se produjo un error al iniciar el servidor ${error}`)
  );