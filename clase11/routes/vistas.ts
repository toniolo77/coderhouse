import express from "express";
const router = express.Router();
import {
    vistaProducto,
    vistaCargaProducto,
    addProductoVista,
} from "../controller/producto";

router.get("/productos/vista", vistaProducto);
router.get("/producto/carga", vistaCargaProducto);
router.post("/producto/carga", addProductoVista);

export default router;
