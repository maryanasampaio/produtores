import { DataSource } from 'typeorm';
import { Produtor } from './src/produtores/produtor.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '159753',
  database: process.env.DB_NAME || 'produtores',
  entities: [Produtor],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
