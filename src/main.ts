
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import express from 'express';

import session = require('express-session');

import expressLayouts from 'express-ejs-layouts';

import { seedPrioridades } from './database/seeders/seed-prioridades';

async function bootstrap() {

  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  /* STATIC */
  app.useStaticAssets(
    join(process.cwd(), 'public'),
  );

  /* VIEWS */
  app.setBaseViewsDir(
    join(__dirname, 'views'),
  );

  app.setViewEngine('ejs');

  /* LAYOUT */
  app.use(expressLayouts);

  app.set('layout', 'layouts/main');

  /* FORM */
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  /* SESSION */
  app.use(
    session({

      secret: 'chave-secreta',

      resave: false,

      saveUninitialized: false,

    }),
  );

  /* SEED */
  const dataSource =
    app.get('DATA_SOURCE');

  await seedPrioridades(dataSource);

  await app.listen(3000);

}

bootstrap();