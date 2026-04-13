import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProdutoresService } from './produtores.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { ListProdutoresQueryDto } from './dto/list-produtores-query.dto';

@Controller('produtores')
export class ProdutoresController {
  constructor(private readonly service: ProdutoresService) {}

  @Post()
  create(@Body() dto: CreateProdutorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: ListProdutoresQueryDto) {
    return this.service.findAll(query);
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
