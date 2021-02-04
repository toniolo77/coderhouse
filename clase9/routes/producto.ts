import express from "express";
const router = express.Router();
import {
  getProductos,
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";

router.get("/productos", getProductos);
router.get("/productos/:id", getProducto);
router.post("/productos", addProducto);
router.delete("/productos/:id", deleteProducto);
router.put("/productos/:id", updateProducto);

export default router;
