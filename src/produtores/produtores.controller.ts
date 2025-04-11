import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoresService } from './produtores.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto'
@Controller('produtores')

export class ProdutoresController {
  constructor(private readonly service: ProdutoresService) {}

  @Post()
  create(@Body() dto: CreateProdutorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProdutorDto) {
  return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
