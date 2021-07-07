import { IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateProducto {
  readonly timestampt: string;
  @IsNotEmpty()
  readonly nombre: string;
  @IsNotEmpty()
  readonly descripcion: string;
  @IsNotEmpty()
  readonly codigo: string;
  @IsNotEmpty()
  readonly foto: string;
  @IsInt()
  @IsNotEmpty()
  readonly stock: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly precio: number;
}
