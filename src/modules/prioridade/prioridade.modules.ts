import { Module } from '@nestjs/common';
import { PrioridadeService } from './prioridade.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule], 
  providers: [PrioridadeService],
  exports: [PrioridadeService],
})
export class PrioridadeModule {}
