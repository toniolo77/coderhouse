import { Request, Response } from "express";
import { ProductoModel }  from '../model/producto';

const prod = new ProductoModel();

export const getProductos = (req: Request,res: Response) => {
    try {
        res.json(prod.getProductos());
    } catch (err) {
        res.status(404).json({error: err});
    }
}

export const getProducto = (req: Request,res: Response) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).json({error: 'Falta parametro id'});

        res.json(prod.getProducto(Number(id)));

    } catch (err) {
        res.status(404).json({error: err});
    }
}

export const addProducto = (req: Request,res: Response) => {
    try {
        const {title, price, thumbnail } = req.body;
        if (!title || !price || !thumbnail) res.status(400).send(JSON.stringify({error: 'Parametros faltantes'}));

        res.json(prod.addProducto(title,Number(price),thumbnail));
    } catch (err) {
        res.status(404).json({error: err});
    }
}