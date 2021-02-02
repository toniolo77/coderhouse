import { Request, Response } from "express";
import ProductoModel from "../model/producto";
import { VisitaModel, TipoVisita } from "../model/visita";

const NOMBRE_ARCHIVO = "productos.txt";
const file = new ProductoModel(NOMBRE_ARCHIVO);
const visita = new VisitaModel();

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getItems = async (req: Request, res: Response) => {
  const productos = await file.leer();
  await visita.addVisita(TipoVisita.ITEMS);

  const respuesta = {
    items: productos,
    cantidad: productos.length,
  };

  res.json(respuesta);
};

export const getItemRandom = async (req: Request, res: Response) => {
  const productos = await file.leer();
  await visita.addVisita(TipoVisita.ITEM);

  if (productos.length == 0) res.status(500).send("Se ha producido un error");

  const respuesta = {
    item: productos[randomNumber(0, productos.length)],
  };

  res.json(respuesta);
};

export const getVisitas = async (req: Request, res: Response) => {
  const respuesta = await visita.getVisitas();
  res.json(respuesta);
};
