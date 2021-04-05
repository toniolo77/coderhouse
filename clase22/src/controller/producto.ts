import { Request, Response } from "express";
import { getProductos } from '../generator/producto';

export const getProductosController = (req: Request, res: Response)  => {
    const cant = req.query.cant || 10;
    if (Number(cant) === 0 ) return res.status(200).json({value:[],msg: "No hay productos"});

    return res.status(200).json({value: getProductos(Number(cant)), msg:""});
}