import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosService } from './productos/productos.service';
import { ProductosController } from './productos/productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ProductoMongoModel } from './schemas/producto.schema';

dotenv.config();

const uri = process.env.MONGO_DB;

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoMongoModel }]),
  ],
  controllers: [AppController, ProductosController],
  providers: [AppService, ProductosService],
})
export class AppModule {}
