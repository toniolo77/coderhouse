import express from "express";
const router = express.Router();

import { getProductosController } from '../controller/producto';

router.get('/',getProductosController)

export default  router;