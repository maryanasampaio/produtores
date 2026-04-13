import { DataSource } from 'typeorm';
import { Produtor } from './src/produtores/produtor.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Produtor],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
