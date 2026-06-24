import {
  Controller,
  Get,
  Post,
  Render,
  Body,
  Param,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { validate } from 'class-validator';

import { plainToInstance } from 'class-transformer';

import { FornecedorService } from './fornecedor.service';

import { CreateFornecedorDto } from './fornecedor.dto';

@Controller('fornecedores')
export class FornecedorController {

  constructor(
    private readonly fornecedorService: FornecedorService,
  ) {}

  // =========================
  // LISTAGEM
  // =========================

  @Get()
  @Render('fornecedores/listagem')
  async index() {

    const fornecedores =
      await this.fornecedorService.findAll();

    return {

      layout: 'layouts/main',

      title: 'Fornecedores',

      fornecedores,

    };

  }

  // =========================
  // NOVO
  // =========================

  @Get('novo')
  @Render('fornecedores/formulario-cadastro')
  novo() {

    return {

      layout: 'layouts/main',

      title: 'Novo Fornecedor',

      erros: {},

      dados: {},

    };

  }

  // =========================
  // CRIAR
  // =========================

  @Post('criar')
  async criar(
    @Body() body: any,
    @Res() res: Response,
  ) {

    const dto =
      plainToInstance(
        CreateFornecedorDto,
        body,
      );

    const errors =
      await validate(dto);

    if (errors.length > 0) {

      const erros: Record<string, string> = {};

      errors.forEach((error) => {

        erros[error.property] =
          Object.values(
            error.constraints ?? {},
          )[0];

      });

      return res.render(
        'fornecedores/formulario-cadastro',
        {

          layout: 'layouts/main',

          title: 'Novo Fornecedor',

          erros,

          dados: body,

        },
      );

    }

    await this.fornecedorService.create({

      empresa: body.empresa,

      telefone: body.telefone,

      status: body.status,

    });

    return res.redirect('/fornecedores');

  }

  // =========================
  // EDITAR
  // =========================

  @Get('editar/:id')
  @Render('fornecedores/formulario-atualizacao')
  async editar(
    @Param('id') id: string,
  ) {

    const fornecedor =
      await this.fornecedorService.findOne(
        Number(id),
      );

    return {

      layout: 'layouts/main',

      title: 'Editar Fornecedor',

      fornecedor,

      erros: {},

    };

  }

  // =========================
  // ATUALIZAR
  // =========================

  @Post('atualizar/:id')
  async atualizar(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {

    const dto =
      plainToInstance(
        CreateFornecedorDto,
        body,
      );

    const errors =
      await validate(dto);

    if (errors.length > 0) {

      const erros: Record<string, string> = {};

      errors.forEach((error) => {

        erros[error.property] =
          Object.values(
            error.constraints ?? {},
          )[0];

      });

      return res.render(
        'fornecedores/formulario-atualizacao',
        {

          layout: 'layouts/main',

          title: 'Editar Fornecedor',

          fornecedor: {

            id: Number(id),

            ...body,

          },

          erros,

        },
      );

    }

    await this.fornecedorService.update(
      Number(id),
      {

        empresa: body.empresa,

        telefone: body.telefone,

        status: body.status,

      },
    );

    return res.redirect('/fornecedores');

  }

  // =========================
  // EXCLUIR
  // =========================

  @Post('excluir/:id')
  async excluir(
    @Param('id') id: string,
    @Res() res: Response,
  ) {

    await this.fornecedorService.delete(
      Number(id),
    );

    return res.redirect('/fornecedores');

  }

}