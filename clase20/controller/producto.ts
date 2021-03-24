import { Request, Response } from "express";
import { ProductoModel } from "../model/producto";
import { getMensajes } from "./chat";

const prod = new ProductoModel();

export const getProductos = (req: Request, res: Response) => {
  try {
    res.json(prod.getProductos());
  } catch (err) {
    res.status(404).json({ error: err });
  }
};


export const getProducto = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ error: "Falta parametro id" });

    res.json(prod.getProducto(Number(id)));
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const addProducto = (req: Request, res: Response) => {
  try {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail)
      res.status(400).send(JSON.stringify({ error: "Parametros faltantes" }));

    res.json(prod.addProducto(title, Number(price), thumbnail));
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const deleteProducto = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ error: "Falta parametro id" });

    res.json(prod.deleteProducto(Number(id)));
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const updateProducto = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail || !id)
      res.status(400).send(JSON.stringify({ error: "Parametros faltantes" }));

    res.json(prod.updateProducto(Number(id), title, Number(price), thumbnail));
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export const vistaProducto = (req: Request, res: Response) => {
  try {
    const productos = prod.getProductos();
    res.render("producto/productos",{productos: productos})
  } catch (err) {
    res.render("producto/productos",{productos: []})
  }
}

const getProductosVista = () => {
  try {
    prod.getProductos();
  } catch (err) {
    return [];
  }
 }

export const vistaCargaProducto = async (req: Request, res: Response) => {
  try {
    const productos = getProductosVista();
    const mensajes = await getMensajes();
    res.render("producto/carga_producto",{productos, mensajes: mensajes})
  } catch (err) {
    res.render("producto/carga_producto",{productos: [], mensajes: []})
  }
}

export const addProductoVista= (title: string,price: number, thumbnail: string) => {
  try {
      return  prod.addProducto(title, Number(price), thumbnail);
  } catch (err) {
    return undefined;
  }
};
