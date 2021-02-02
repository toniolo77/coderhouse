import express from 'express';
import { getItems, getItemRandom, getVisitas } from '../controller/producto';
const router = express.Router();

router.get('/items', getItems)
router.get('/item-random', getItemRandom)
router.get('/visitas', getVisitas)

export default router;