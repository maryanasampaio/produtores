import { Module } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';
import { IndicadoresController } from './indicadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from '../produtores/produtor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  controllers: [IndicadoresController],
  providers: [IndicadoresService],
})
export class IndicadoresModule {}
