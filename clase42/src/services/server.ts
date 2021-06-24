import express, { Application } from "express";
import { errorHandler } from "../middlewares/error";
import mainRouter from "../routes/index";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Para interpretar los objectos recibidos y que no sean solo cadenas


app.use("/", mainRouter);

app.use(errorHandler);

export default app;
