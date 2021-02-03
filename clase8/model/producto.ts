export interface Producto {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}


export class ProductoModel {
  private productos: Producto[];

  constructor() {
    this.productos = [];
  }

  getProductos = (): Producto[] => {
    if (this.productos.length == 0) throw "No hay productos cargados";

    return this.productos;
  };

  getProducto = (id: number): Producto => {
    const prod = this.productos.find((producto) => producto.id === id);
    if (!prod) throw "producto no encontrado";
    return prod;
  };

  addProducto = (title: string, price: number, thumbnail: string): Producto => {
    const nuevoProducto: Producto = {
      id: this.productos.length + 1,
      title,
      price,
      thumbnail,
    };
    this.productos.push(nuevoProducto);

    return nuevoProducto;
  };
}
