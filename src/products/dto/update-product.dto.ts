import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  //Se agrego el id para que el microservicio recibiera y manejara esta propiedad en el proceso de update.
  @IsNumber()
  @IsPositive()
  id: number;
}
