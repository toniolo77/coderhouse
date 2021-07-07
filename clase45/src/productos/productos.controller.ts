import { ObjectId } from 'mongoose';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProducto } from '../dto/create-cat.dto';
import { ProductosService } from './productos.service';
import { Producto } from '../interfaces/producto.interface';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productoService: ProductosService) {}

  @Get()
  async getAllProductos(): Promise<Producto[]> {
    return await this.productoService.getProductos();
  }

  @Get(':id')
  async getProducto(@Param('id') idProducto: ObjectId): Promise<Producto | string> {
    try {
      const producto = await this.productoService.getProducto(idProducto);
      return producto ? producto : "No se ha podido obtener el producto";
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async crearProducto(@Body() producto: CreateProducto): Promise<Producto> {
    return await this.productoService.addProducto(producto);
  }

  @Put(':id')
  async modificarProducto(
    @Param('id') idProducto: string,
    @Body() producto: CreateProducto,
  ): Promise<Producto | string> {
    const updatedProducto = await this.productoService.updateProducto(
      idProducto,
      producto,
    );
    return updatedProducto
      ? updatedProducto
      : 'No se ha podido actualizar el producto';
  }

  @Delete(':id')
  async borrarProducto(
    @Param('id') idProducto: string,
  ): Promise<Producto | string> {
    const deleted = await this.productoService.deleteProducto(idProducto);
    return deleted ? deleted : 'No se ha podido eliminar el elemento';
  }
}
