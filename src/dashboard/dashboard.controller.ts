import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';

import { DashboardService }
from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly dashboardService:
    DashboardService,
  ) {}

  @Get()
  @Render('dashboard/home')
  async index() {

    const dashboard =
      await this.dashboardService
        .getDashboardData();

    return {

      layout: 'layouts/main',

      title: 'Dashboard',

      ...dashboard,

    };

  }

}