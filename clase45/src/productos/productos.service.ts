import { ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from '../interfaces/producto.interface';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel('Producto')
    private readonly ProductoMongoModel: Model<Producto>,
  ) {}

  getProducto = async (id: ObjectId) => {
    try {
      return await this.ProductoMongoModel.findById(id);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  getProductos = async () => {
    return await this.ProductoMongoModel.find();
  };

  addProducto = async (producto: Producto) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = producto;
    const newProduct = await new this.ProductoMongoModel({
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
    try {
      return await this.ProductoMongoModel.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  updateProducto = async (id: string, producto: Producto) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = producto;
    try {
      let newProduct = await this.ProductoMongoModel.findById(id);
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
    } catch (err) {
      console.log(err);
      return;
    }
  };
}
