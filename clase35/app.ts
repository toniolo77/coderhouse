import cluster from "cluster";
const numCPUs = require("os").cpus().length;
import { initServer } from "./server";
import Logger from './loggin/loggin';
require('dotenv').config();

let PORT = process.env.PORT || 8082;
let FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
let FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
let MODE = "fork";


process.argv.forEach((val, index) => {
  switch (index) {
    case 2:
      PORT = Number(val) || PORT;
      break;
    case 3:
      FACEBOOK_CLIENT_ID = val ?? FACEBOOK_CLIENT_ID;
      break;
    case 4:
      FACEBOOK_CLIENT_SECRET = val ?? FACEBOOK_CLIENT_SECRET;
      break;
    case 5:
      MODE = val ?? MODE;
      break;
  }
});

if (MODE === "CLUSTER") {
  if (cluster.isMaster) {
    Logger.info(`Master ${process.pid} is running ${numCPUs}`);

    //For workers
    for (let i = 0; i < 2; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      Logger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    initServer(PORT, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET);
  }
} else {
  Logger.info("Mode fork");
  initServer(PORT, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET);
}
