import express from 'express';
const router = express.Router();
import { getProductos, getProducto, addProducto} from '../controller/producto';


router.get("/",getProductos);
router.get("/:id",getProducto);
router.post("/",addProducto);

export default router;