import { Module } from '@nestjs/common';
import { ManutencoesController } from './manutencoes.controller';
import { ManutencoesService } from './manutencoes.service';
import { PrioridadeModule } from './prioridade/prioridade.modules';
import { EquipamentoModule } from './equipamento/equipamento.module';
import { FotoModule } from './foto/foto.module';

@Module({
  imports: [PrioridadeModule, EquipamentoModule, FotoModule],
  controllers: [ManutencoesController],
  providers: [ManutencoesService],
  exports: [ManutencoesService],
})
export class ManutencoesModule {}
