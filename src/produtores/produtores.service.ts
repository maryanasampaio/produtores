import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from './produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';

@Injectable()
export class ProdutoresService {
  constructor(
    @InjectRepository(Produtor)
    private repo: Repository<Produtor>,
  ) {}

  async create(data: CreateProdutorDto): Promise<Produtor> {
    if (data.areaAgricultavel + data.areaVegetacao > data.areaTotal) {
      throw new BadRequestException('Soma das áreas não pode ser maior que área total');
    }

    const produtor = this.repo.create(data);
    return this.repo.save(produtor);
  }

  findAll(): Promise<Produtor[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Produtor> {
    const produtor = await this.repo.findOneBy({ id });
  
    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }
  
    return produtor;
  }
  

  async remove(id: string) {
    const produtor = await this.repo.findOneBy({ id });
    if (!produtor) throw new NotFoundException('Produtor não encontrado');

    await this.repo.softDelete(id);
  }
}
