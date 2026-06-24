
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ManutencoesModule } from './modules/manutencoes.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorsModule } from './errors/errors.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { AuthModule } from './views/auth/auth.module';
import { EquipamentoModule } from './modules/equipamento/equipamento.module';
import { FotoModule } from './modules/foto/foto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
  envFilePath: join(process.cwd(), '.env'),
    }),
    DatabaseModule, // 🔥 obrigatório (mesmo sendo global)
    ManutencoesModule,
    DashboardModule,
    FornecedorModule,
    EquipamentoModule,
    AuthModule,
    FotoModule,
    ErrorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}