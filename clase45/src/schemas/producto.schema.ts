import * as mongoose from 'mongoose';

export const ProductoMongoModel = new mongoose.Schema({
  timestampt: { type: Date, required: true, default: Date.now },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
});
