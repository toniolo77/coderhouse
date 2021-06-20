import { Request, Response } from "express";
import ProductoModel from "../model/producto";
import { EMPTY_VALUE } from "./../utils/common";


export const getProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    return id
      ? res.json((await ProductoModel.getProducto(id)) ?? EMPTY_VALUE)
      : res.json(await ProductoModel.getProductos());
  } catch (err) {
    next(err);
  }
};


export const deleteProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const deletedProducto = await ProductoModel.deleteProducto(id);
    res.json(deletedProducto);
  } catch (err) {
    next(err);
  }
};

export const addProducto = async (req: Request, res: Response, next) => {
  try {
    const product = await ProductoModel.addProducto(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};


export const updateProducto = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const product = await ProductoModel.updateProducto(id,req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};
