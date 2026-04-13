import {
    Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, Index,
    CreateDateColumn, UpdateDateColumn
  } from 'typeorm';

  @Index('IDX_produtores_estado_ativo', ['estado'], { where: '"deletadoEm" IS NULL' })
  @Entity('produtores')
  export class Produtor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    cpfOuCnpj: string;
  
    @Column()
    nomeProdutor: string;
  
    @Column()
    nomeFazenda: string;
  
    @Column()
    cidade: string;
  
    @Column()
    estado: string;
  
    @Column('decimal')
    areaTotal: number;
  
    @Column('decimal')
    areaAgricultavel: number;
  
    @Column('decimal')
    areaVegetacao: number;
  
    @Column('text', { array: true })
    culturas: string[];
  
    @CreateDateColumn()
    criadoEm: Date;
  
    @UpdateDateColumn()
    atualizadoEm: Date;
  
    @DeleteDateColumn()
    deletadoEm?: Date;
  }
  