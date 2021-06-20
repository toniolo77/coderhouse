require("dotenv").config();
import { connectToDatabase } from "./services/db";
import Logger from "./loggin/loggin";
import app from "./services/server";
import cluster from "cluster";
const numCPUs = require("os").cpus().length;
import { Database } from "./utils/common";

const PORT = process.env.PORT || 9005;
const optionDatabase = process.argv[2] || Database.MONGO;
let MODE = "FORK";

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
    connectToDatabase().then(() => {
      app
        .listen(PORT, async () => {
          Logger.info("Server started.");
          if (optionDatabase === Database.MONGO) {
          }
        })
        .on("error", (error) => Logger.error(error));
    });
  }
} else {
  Logger.info("Mode fork");
  connectToDatabase().then(() => {
    app
      .listen(PORT, async () => {
        Logger.info("Server started.");
        if (optionDatabase === Database.MONGO) {
          await connectToDatabase();
        }
      })
      .on("error", (error) => Logger.error(error));
  });
}
