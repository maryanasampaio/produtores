import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Produtor } from '../produtores/produtor.entity';

@Injectable()
export class IndicadoresService {
    constructor(
        @InjectRepository(Produtor)
        private readonly repo: Repository<Produtor>,
        private readonly dataSource: DataSource,
    ) { }

    async totalFazendas(): Promise<number> {
        return this.repo.count();
    }

    async somaHectares(): Promise<number> {
        const result = await this.repo
            .createQueryBuilder('p')
            .select('SUM(p.areaTotal)', 'soma')
            .getRawOne();

        return Number(result.soma);
    }

    async culturasPorEstado() {
        return this.dataSource.query(`
      SELECT
        estado,
        unnest(culturas) AS cultura,
        COUNT(*) AS total
      FROM produtores
      WHERE "deletadoEm" IS NULL
      GROUP BY estado, cultura
      ORDER BY estado, cultura
    `);
    }
}
