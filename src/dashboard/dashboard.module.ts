import { Module } from '@nestjs/common';

import { DashboardController }
from './dashboard.controller';

import { DashboardService }
from './dashboard.service';

import { ManutencoesModule }
from '../modules/manutencoes.module';

@Module({

  imports: [
    ManutencoesModule,
  ],

  controllers: [
    DashboardController,
  ],

  providers: [
    DashboardService,
  ],

})

export class DashboardModule {}