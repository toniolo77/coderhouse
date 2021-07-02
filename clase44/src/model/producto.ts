import { ProductoMongoPersistenciaDAO } from "./productoMongoDAO";
import { ProductoMemPersistenciaDAO } from "./productoMemDAO";
import { Database } from "../utils/common";
import Logger from "../loggin/loggin";
import environmentValues from '../config/config';
import { ObjectId } from "mongoose";

export interface Producto {
  id: String;
  timestampt: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
  fyh?: string;
}

export interface ProductoDAO {
  getProducto(id: string): Promise<Producto>;
  getProductos(): Promise<Producto[]>;
  addProducto(producto: Producto): Promise<Producto>;
  updateProducto(id: string, producto:Producto): Promise<Producto>;
  deleteProducto(id: string): Promise<Producto>;
}

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */

let productoDatabase;

const setDatabase = (opcion) => {
  switch (opcion) {
    case Database.MONGO:
      Logger.info("Opcion elegida: Mongo");
      if (!productoDatabase) productoDatabase = new ProductoMongoPersistenciaDAO();
      return productoDatabase;
    case Database.MEMORY:
      Logger.info("Opcion elegida: Memory");
      if (!productoDatabase) productoDatabase = new ProductoMemPersistenciaDAO();
      return productoDatabase;
    default:
      Logger.info("Ninguna es correcta se usa por defecto: Mongo");
      if (!productoDatabase) productoDatabase = new ProductoMongoPersistenciaDAO();
      return productoDatabase;
  }
};

const opcion = environmentValues.TYPE_DATABASE;
export default setDatabase(opcion);
