import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post() ===> pueden convivir las http request y comunicacion por medio del protocolo tcp
  //CON EL "MessagePattern" SE ESTABLECE LA "RUTA" PARA QUE LA REQUEST SE RESUELVA.
  // el "MessagePattern" espera una respuesta del servidor, es similar a http request
  // es equivalente a la "ruta"
  @MessagePattern({ cmd: 'create_product' })
  //El payload es validado por el dto como si fuera una request http
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'find_all_products' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'find_one_product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  // ParseIntPipe es mas pesado para el proyecto que hacer la trasnformacion manual en codigo con "+" = update(+id, updateProductDto).
  @MessagePattern({ cmd: 'update_product' })
  //Para esta operacion que se asemeja a un put el id del producto a actualizar viene en el payload junto con la data a actualizar
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Param('id') id: string) {
    // con el "+" el id tipo string que se le pasa al metodo se parsea a int
    return this.productsService.remove(+id);
  }
}
