import express from "express";
const router = express.Router();
import { mensajesVista } from "../controller/chat";
import { getInfo } from "../controller/info";
import { middlewares } from "../middlewares/permiso";

router.get("/chat",middlewares.isLogin, mensajesVista);
router.get("/info",getInfo);


export default router;
