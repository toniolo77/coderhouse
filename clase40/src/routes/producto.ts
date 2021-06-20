import express from "express";
const router = express.Router();
import {
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";
import fieldsValidation from "../middlewares/field-validation";
const { param, query, body } = require("express-validator");

router.get(
  "/:id?",
  [
    param("id")
      .optional().isString(),
    fieldsValidation,
  ],
  getProducto
);

router.post(
  "/",
  [
    body("nombre").isString(),
    body("descripcion").isString(),
    body("codigo").isString(),
    body("foto").isString(),
    body("stock").isNumeric().withMessage("debe ser un numero"),
    fieldsValidation,
  ],
  addProducto
);

router.put(
  "/:id",
  [
    param("id").optional().isString(),
    body("nombre").isString(),
    body("descripcion").isString(),
    body("codigo").isString(),
    body("foto").isString(),
    body("stock").isNumeric().withMessage("debe ser un numero"),
    fieldsValidation,
  ],
  updateProducto
);

router.delete(
  "/:id",
  [
    param("id").optional().isString(),
    fieldsValidation,
  ],
  deleteProducto
);

export default router;
