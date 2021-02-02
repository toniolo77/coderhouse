import fs from "fs";

export interface Producto {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default class ProductoModel {
  private nombreArchivo: string;

  constructor(archivo: string) {
    this.nombreArchivo = archivo;
  }

  leer = async (): Promise<Producto[]> => {
    try {
      if (!fs.existsSync(this.nombreArchivo)) return [];

      const lectura = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      const productos: Producto[] = JSON.parse(lectura);

      return productos ? productos : [];
    } catch (err) {
      console.log("Se produjo un error leer");
      return [];
    }
  };

  guardar = async (
    title: string,
    price: number,
    thumbnail: string
  ): Promise<void> => {
    try {
      const productos: Producto[] = await this.leer();
      const nuevoProducto: Producto = {
        id: productos.length + 1,
        title: title,
        price: price,
        thumbnail: thumbnail,
      };

      productos.push(nuevoProducto);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(productos)
      );
    } catch (err) {
      console.log("Se produjo un error al guardar");
    }
  };

  borrar = async (): Promise<void> => {
    try {
      await fs.promises.unlink(this.nombreArchivo);
    } catch (err) {
      console.log("Se produjo un error al eliminar el archivo");
    }
  };
}
