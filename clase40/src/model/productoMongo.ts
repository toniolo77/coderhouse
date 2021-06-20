import mongoose from "mongoose";
import { Producto } from './producto';
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

export class ProductoMongoPersistencia {
  getProducto = async (id: string) => {
    return ProductoMongoModel.findById(id);
  };

  getProductos = async () => {
    return ProductoMongoModel.find();
  };

  addProducto = async (producto : Producto ) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = producto;
    const newProduct = await new ProductoMongoModel({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    }).save();
    return newProduct;
  };

  deleteProducto = async (id: string) => {
      return  await ProductoMongoModel.findByIdAndRemove(id);
  }

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
    return newProduct;
  }
}
