import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DATABASE_SOURCE } from '../constants/database-source';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: DATABASE_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {

      // 🔥 DEBUG (pode remover depois)
      console.log('CONFIG DB_PASSWORD:', configService.get('DB_PASSWORD'));
      console.log('ENV DB_PASSWORD:', process.env.DB_PASSWORD);

      const host =
        configService.get<string>('DB_HOST') ||
        processServiceEnv('DB_HOST', 'localhost');

      const port =
        Number(configService.get<string>('DB_PORT')) ||
        Number(processServiceEnv('DB_PORT', '3306'));

      const username =
        configService.get<string>('DB_USERNAME') ||
        processServiceEnv('DB_USERNAME', 'root');

      const password =
        configService.get<string>('DB_PASSWORD') ||
        processServiceEnv('DB_PASSWORD', '123456');

      const database =
        configService.get<string>('DB_NAME') ||
        processServiceEnv('DB_NAME', 'manutencao');

      const dataSource = new DataSource({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, 
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];

// 🔥 função helper pra evitar repetição
function processServiceEnv(key: string, fallback: string) {
  return process.env[key] || fallback;
}