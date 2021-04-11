import express from "express";
const router = express.Router();
import { mensajesVista } from "../controller/chat";

router.get("/chat", mensajesVista);

export default router;
