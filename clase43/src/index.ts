import environmentValues from './config/config';
import args from './services/arguments';
import { connectToDatabase } from "./services/db";
import Logger from "./loggin/loggin";
import app from "./services/server";
import cluster from "cluster";
const numCPUs = require("os").cpus().length;
import { Database } from "./utils/common";

const PORT = args.port;
let MODE = "FORK";

const initServer = async () => {
  if (MODE === "CLUSTER") {
    if (cluster.isMaster) {
      Logger.info(`Master ${process.pid} is running`);

      //For workers
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        Logger.info(`worker ${worker.process.pid} died`);
      });
    } else {
      if (environmentValues.TYPE_DATABASE === Database.MONGO) await connectToDatabase();
      app
        .listen(PORT, async () => {
          Logger.info("Server started.");
        })
        .on("error", (error) => Logger.error(error));
    }
  } else {
    Logger.info("Mode fork");
    if (environmentValues.TYPE_DATABASE === Database.MONGO) await connectToDatabase();
    app
      .listen(PORT, async () => {
        Logger.info("Server started.");
      })
      .on("error", (error) => Logger.error(error));
  }
};

initServer();
