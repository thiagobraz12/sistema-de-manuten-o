import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';

@Controller()
export class AppController {

  // =========================
  // SOBRE
  // =========================

  @Get('sobre')
  @Render('sobre')
  sobre() {

    return {

      layout: 'layouts/main',
      title: 'Sobre o Sistema',

    };

  }

}