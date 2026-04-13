import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEstadoIndexToProdutores1744560000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_produtores_estado_ativo"
      ON "produtores" ("estado")
      WHERE "deletadoEm" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_produtores_estado_ativo"');
  }
}