import express from "express";

import productoRoutes from "./producto";
const router = express.Router();


router.use("/producto", new productoRoutes().start());


router.use((req, res, next) => {
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} no implementada`,
  });
});

export default router;
