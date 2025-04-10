import { Controller, Get } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service';

@Controller('indicadores')
export class IndicadoresController {
  constructor(private readonly service: IndicadoresService) {}

  @Get('total-fazendas')
  totalFazendas() {
    return this.service.totalFazendas();
  }

  @Get('soma-hectares')
  somaHectares() {
    return this.service.somaHectares();
  }

  @Get('culturas-por-estado')
  culturasPorEstado() {
    return this.service.culturasPorEstado();
  }
}
