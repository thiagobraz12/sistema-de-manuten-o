import {Controller, Get, Post, Render, Body, Param, Res,} from '@nestjs/common';
import type { Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EquipamentoService } from './equipamento.service';
import { CreateEquipamentoDto } from './equipamento.dto';
import { Equipamento } from './equipamento.entity';

@Controller('equipamentos')
export class EquipamentoController {

  constructor(
    private readonly equipamentoService: EquipamentoService,
  ) {}

  // =========================
  // LISTAGEM
  // =========================

  @Get()
  @Render('equipamentos/listagem')
  async index() {

    const equipamentos =
      await this.equipamentoService.findAll();

    return {

      layout: 'layouts/main',

      title: 'Equipamentos',

      equipamentos,

    };

  }
  @Get('ativos')
  async ativos(): Promise<Equipamento[]> {

     return this.equipamentoService.findAllAtivos();

   }

  // =========================
  // NOVO
  // =========================

  @Get('novo')
  @Render('equipamentos/formulario-cadastro')
  novo() {

    return {

      layout: 'layouts/main',

      title: 'Novo Equipamento',

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
        CreateEquipamentoDto,
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
        'equipamentos/formulario-cadastro',
        {

          layout: 'layouts/main',

          title: 'Novo Equipamento',

          erros,

          dados: body,

        },
      );

    }

    await this.equipamentoService.create({

      nome: body.nome,

      patrimonio: body.patrimonio,

      marca: body.marca,

      modelo: body.modelo,

      localizacao: body.localizacao,

      status: body.status,

    });

    return res.redirect(
      '/equipamentos',
    );

  }

  // =========================
  // EDITAR
  // =========================

  @Get('editar/:id')
  @Render(
    'equipamentos/formulario-atualizacao',
  )
  async editar(
    @Param('id') id: string,
  ) {

    const equipamento =
      await this.equipamentoService.findOne(
        Number(id),
      );

    return {

      layout: 'layouts/main',

      title: 'Editar Equipamento',

      equipamento,

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
        CreateEquipamentoDto,
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
        'equipamentos/formulario-atualizacao',
        {

          layout: 'layouts/main',

          title: 'Editar Equipamento',

          equipamento: {

            id: Number(id),

            ...body,

          },

          erros,

        },
      );

    }

    await this.equipamentoService.update(
      Number(id),
      {

        nome: body.nome,

        patrimonio: body.patrimonio,

        marca: body.marca,

        modelo: body.modelo,

        localizacao: body.localizacao,

        status: body.status,

      },
    );

    return res.redirect(
      '/equipamentos',
    );

  }

  // =========================
  // EXCLUIR
  // =========================

  @Post('excluir/:id')
  async excluir(
    @Param('id') id: string,
    @Res() res: Response,
  ) {

    await this.equipamentoService.delete(
      Number(id),
    );

    return res.redirect(
      '/equipamentos',
    );

  }

}