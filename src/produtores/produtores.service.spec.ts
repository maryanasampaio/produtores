import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produtor } from './produtor.entity';
import { ProdutoresService } from './produtores.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';

type MockRepository = {
  create: jest.Mock;
  save: jest.Mock;
  findAndCount: jest.Mock;
  findOneBy: jest.Mock;
  merge: jest.Mock;
  softDelete: jest.Mock;
};

describe('ProdutoresService', () => {
  let service: ProdutoresService;
  let repository: MockRepository;

  const createDto: CreateProdutorDto = {
    cpfOuCnpj: '12345678901',
    nomeProdutor: 'Maria Oliveira',
    nomeFazenda: 'Fazenda Sao Jose',
    cidade: 'Uberlandia',
    estado: 'MG',
    areaTotal: 100,
    areaAgricultavel: 60,
    areaVegetacao: 40,
    culturas: ['Soja', 'Milho'],
  };

  const produtor: Produtor = {
    id: 'produtor-1',
    ...createDto,
    criadoEm: new Date('2026-04-13T00:00:00.000Z'),
    atualizadoEm: new Date('2026-04-13T00:00:00.000Z'),
    deletadoEm: undefined,
  };

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
      findAndCount: jest.fn(),
      findOneBy: jest.fn(),
      merge: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoresService,
        {
          provide: getRepositoryToken(Produtor),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ProdutoresService>(ProdutoresService);
  });

  it('deve criar um produtor quando a soma das areas for valida', async () => {
    repository.create.mockReturnValue(produtor);
    repository.save.mockResolvedValue(produtor);

    const result = await service.create(createDto);

    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalledWith(produtor);
    expect(result).toEqual(produtor);
  });

  it('deve rejeitar criacao quando a soma das areas exceder a area total', async () => {
    const dtoInvalido: CreateProdutorDto = {
      ...createDto,
      areaAgricultavel: 70,
      areaVegetacao: 40,
    };

    await expect(service.create(dtoInvalido)).rejects.toThrow(BadRequestException);
    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('deve retornar produtores paginados com metadados', async () => {
    repository.findAndCount.mockResolvedValue([[produtor], 1]);

    const result = await service.findAll({ page: 2, limit: 5 });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      order: { criadoEm: 'DESC' },
      skip: 5,
      take: 5,
    });
    expect(result).toEqual({
      data: [produtor],
      meta: {
        page: 2,
        limit: 5,
        total: 1,
        totalPages: 1,
      },
    });
  });

  it('deve retornar um produtor pelo id', async () => {
    repository.findOneBy.mockResolvedValue(produtor);

    const result = await service.findOne('produtor-1');

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'produtor-1' });
    expect(result).toEqual(produtor);
  });

  it('deve lancar erro ao buscar produtor inexistente', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne('inexistente')).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um produtor existente', async () => {
    const updateDto: UpdateProdutorDto = { nomeFazenda: 'Fazenda Atualizada' };
    const produtorAtualizado = { ...produtor, ...updateDto };

    repository.findOneBy.mockResolvedValue(produtor);
    repository.merge.mockReturnValue(produtorAtualizado);
    repository.save.mockResolvedValue(produtorAtualizado);

    const result = await service.update('produtor-1', updateDto);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'produtor-1' });
    expect(repository.merge).toHaveBeenCalledWith(produtor, updateDto);
    expect(repository.save).toHaveBeenCalledWith(produtorAtualizado);
    expect(result).toEqual(produtorAtualizado);
  });

  it('deve lancar erro ao atualizar produtor inexistente', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.update('inexistente', { nomeProdutor: 'Novo Nome' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve remover um produtor existente com soft delete', async () => {
    repository.findOneBy.mockResolvedValue(produtor);
    repository.softDelete.mockResolvedValue({ affected: 1 });

    await service.remove('produtor-1');

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'produtor-1' });
    expect(repository.softDelete).toHaveBeenCalledWith('produtor-1');
  });

  it('deve lancar erro ao remover produtor inexistente', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.remove('inexistente')).rejects.toThrow(NotFoundException);
    expect(repository.softDelete).not.toHaveBeenCalled();
  });
});