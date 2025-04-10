import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProdutoresTable1744292091158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'produtores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cpfOuCnpj',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'nomeProdutor',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nomeFazenda',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cidade',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'estado',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'areaTotal',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'areaAgricultavel',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'areaVegetacao',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'culturas',
            type: 'text',
            isArray: true,
            isNullable: false,
          },
          {
            name: 'criadoEm',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'atualizadoEm',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deletadoEm',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('produtores');
  }
}
