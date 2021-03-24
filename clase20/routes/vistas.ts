import express from "express";
const router = express.Router();
import {
    vistaProducto,
    vistaCargaProducto,
} from "../controller/producto";

router.get("/productos/vista", vistaProducto);
router.get("/producto/carga", vistaCargaProducto);

export default router;
