import {
  Controller,
  All,
  Req,
  Res,
} from '@nestjs/common';

import type {
  Request,
  Response,
} from 'express';

@Controller()
export class ErrorsController {

  @All('*')
  notFound(
    @Req() req: Request,
    @Res() res: Response,
  ) {

    return res.status(404).render('errors/404', {

      layout: 'layouts/main',

      title: 'Página não encontrada',

      url: req.originalUrl,

    });

  }

}