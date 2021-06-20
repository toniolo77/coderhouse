import { ProductoMongoPersistencia } from "./productoMongo";
import { ProductoMemPersistencia } from "./productoMem";
import { Database } from "../utils/common";
import Logger from "../loggin/loggin";

export interface Producto {
  id?: number;
  timestampt: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */

let productoDatabase;

const setDatabase = (opcion) => {
  switch (opcion) {
    case Database.MONGO:
      Logger.info("Opcion elegida: Mongo");
      if (!productoDatabase) productoDatabase = new ProductoMongoPersistencia();
      return productoDatabase;
    case Database.MEMORY:
      Logger.info("Opcion elegida: Memory");
      if (!productoDatabase) productoDatabase = new ProductoMemPersistencia();
      return productoDatabase;
    default:
      Logger.info("Ninguna es correcta se usa por defecto: Mongo");
      if (!productoDatabase) productoDatabase = new ProductoMongoPersistencia();
      return productoDatabase;
  }
};

const opcion = process.argv[2] || Database.MONGO;
export default setDatabase(opcion);
