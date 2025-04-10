import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from './produtor.entity';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  controllers: [ProdutoresController],
  providers: [ProdutoresService],
})
export class ProdutoresModule {}
