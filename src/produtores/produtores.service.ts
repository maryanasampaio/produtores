import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from './produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { ListProdutoresQueryDto } from './dto/list-produtores-query.dto';

type PaginatedProdutoresResponse = {
  readonly data: Produtor[];
  readonly meta: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
};

@Injectable()
export class ProdutoresService {
  constructor(
    @InjectRepository(Produtor)
    private readonly repo: Repository<Produtor>,
  ) {}

  async create(data: CreateProdutorDto): Promise<Produtor> {
    if (data.areaAgricultavel + data.areaVegetacao > data.areaTotal) {
      throw new BadRequestException('Soma das áreas não pode ser maior que área total');
    }

    const produtor = this.repo.create(data);
    return this.repo.save(produtor);
  }

  async findAll(query: ListProdutoresQueryDto): Promise<PaginatedProdutoresResponse> {
    const { page, limit } = query;
    const [data, total] = await this.repo.findAndCount({
      order: { criadoEm: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Produtor> {
    const produtor = await this.repo.findOneBy({ id });

    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return produtor;
  }

  async update(id: string, dto: UpdateProdutorDto): Promise<Produtor> {
    const produtor = await this.repo.findOneBy({ id });

    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }

    const atualizado = this.repo.merge(produtor, dto);
    return this.repo.save(atualizado);
  }

  async remove(id: string) {
    const produtor = await this.repo.findOneBy({ id });
    if (!produtor) throw new NotFoundException('Produtor não encontrado');

    await this.repo.softDelete(id);
  }
}
