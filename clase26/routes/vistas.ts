import express from "express";
const router = express.Router();
import { mensajesVista } from "../controller/chat";
import { middlewares } from "../middlewares/permiso";

router.get("/chat",middlewares.isLogin, mensajesVista);

export default router;
