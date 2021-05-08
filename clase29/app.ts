import cluster from "cluster";
const numCPUs = require("os").cpus().length;
import { initServer } from "./server";

let PORT = 8080;
let FACEBOOK_CLIENT_ID = "125727899514372";
let FACEBOOK_CLIENT_SECRET = "b4537505bae78c5ed3fc13e87f9f489b";
let MODE = 'fork'

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

if (MODE === 'CLUSTER') {
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running ${numCPUs}`);
    
      //For workers
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      initServer();
    }
} else{
    console.log("Mode fork");
    initServer();
}
