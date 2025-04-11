import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from './produtor.entity';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';
import { CpfOuCnpjValidator } from './validators/cpf-cnpj.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  controllers: [ProdutoresController],
  providers: [ProdutoresService, CpfOuCnpjValidator],
})
export class ProdutoresModule {}
