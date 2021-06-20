import { Producto } from "./producto";
import { v4 as uuidv4 }  from 'uuid';

export class ProductoMemPersistencia {
  productos;

  constructor() {
    this.productos = [];
  }

  getProducto = async (id: string) => {
      return this.productos.find(producto => producto.id === id);
  };

  getProductos = async () => {
      return this.productos;
  };

  addProducto = async (producto: Producto) => {
    const newProduct = {...producto, id: uuidv4()}
    this.productos.push(newProduct);
    return newProduct;
  };

  deleteProducto = async (id: string) => {
    const producto = await this.getProducto(id);
    this.productos= this.productos.filter(producto => producto.id !== id);
    return producto;

  };

  updateProducto = async (id: string, producto: Producto) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = producto;
    const indexProducto = this.productos.findIndex(producto => producto.id === id);
    let newProduct = await this.getProducto(id);
    newProduct = Object.assign(newProduct, {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    this.productos[indexProducto] = newProduct;

    return newProduct;
  };
}
