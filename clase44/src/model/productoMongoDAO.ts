import mongoose from "mongoose";
import { Producto, ProductoDAO } from "./producto";
import { ProductoDTO } from "./productoDTO";
const { Schema } = mongoose;

const productSchema = new Schema({
  timestampt: { type: Date, required: true, default: Date.now },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
});

const ProductoMongoModel = mongoose.model("Producto", productSchema);

export class ProductoMongoPersistenciaDAO implements ProductoDAO {
  getProducto = async (id: string) => {
    try {
      const producto = await ProductoMongoModel.findById(id);
      return ProductoDTO(producto);
    } catch (err) {
      console.log(err);
    }
  };
  
  getProductos = async () => {
    const productos = await ProductoMongoModel.find();
    return productos.map((producto) => ProductoDTO(producto));
  };

  addProducto = async (producto: Producto) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = producto;
    const newProduct = await new ProductoMongoModel({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    }).save();
    return ProductoDTO(newProduct);
  };

  deleteProducto = async (id: string) => {
    return ProductoDTO(await ProductoMongoModel.findByIdAndRemove(id));
  };

  updateProducto = async (id: string, producto: Producto) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = producto;
    let newProduct = await ProductoMongoModel.findById(id);
    newProduct = Object.assign(newProduct, {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    await newProduct.save();
    return ProductoDTO(newProduct);
  };
}
