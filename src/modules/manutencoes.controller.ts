import { Manutencao } from './manutencao.entity';

import { Express } from 'express';
import {
  Controller,
  Get,
  Post,
  Render,
  Param,
  Body,
  Res,
  Query,
} from '@nestjs/common';

import type { Response } from 'express';

import { validate } from 'class-validator';

import { plainToInstance } from 'class-transformer';

import {
  CreateManutencaoDto,
} from './manutencao.dto';

import { ManutencoesService } from './manutencoes.service';

import { EquipamentoService }
from './equipamento/equipamento.service';

import {
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import {
  diskStorage,
} from 'multer';

import {
  extname,
} from 'path';
import { FotoService } from './foto/foto.service';

@Controller('manutencoes')
export class ManutencoesController {

  constructor(
    private readonly manutencoesService: ManutencoesService,
    private readonly equipamentoService: EquipamentoService,
    private readonly fotoService: FotoService,
  ) {}

  // =========================
  // LISTAGEM
  // =========================

  @Get()
  async index(
  @Query('sucesso') sucesso: string,
  @Res() res: Response,
) {

  const manutencoes =
    await this.manutencoesService.findAll();

  return res.render(
    'manutencoes/listagem',
    {

      layout: 'layouts/main',

      title: 'Sistema de Manutenção',

      manutencoes,

      sucesso,

    },
  );

}

  // =========================
  // NOVA
  // =========================

  @Get('nova')
  @Render('manutencoes/formulario-cadastro')
  async nova() {

    const prioridades =
      await this.manutencoesService.findPrioridades();

    const fornecedores =
      await this.manutencoesService.findFornecedores();

    const equipamentos =
      await this.equipamentoService.findAllAtivos();

    return {

      layout: 'layouts/main',

      title: 'Nova Solicitação',

      prioridades,

      fornecedores,

      equipamentos,

      dados: {},

      erros: {},

    };

  }

  // =========================
  // CRIAR
  // =========================

  @Post('criar')
   @UseInterceptors(
   FileInterceptor(
    'foto',
    {
      storage: diskStorage({

        destination:
          './public/uploads',

        filename:
          (req, file, callback) => {

            const nomeArquivo =
              Date.now() +
              extname(
                file.originalname,
              );

            callback(
              null,
              nomeArquivo,
            );

          },

      }),
    },
  ),
)
  async criar(
  @Body() body: any,

  @UploadedFile()
  foto: Express.Multer.File,

  @Res()
  res: Response,
  ) {
     
  const dto =
    plainToInstance(
      CreateManutencaoDto,
      body,
    );

  const errors =
    await validate(dto);

  if (
    body.preventiva === 'true'
  ) {

    if (!body.periodicidade) {

      errors.push({
        property: 'periodicidade',
        constraints: {
          required:
            'Informe a periodicidade da manutenção preventiva.',
        },
      } as any);

    }

    if (!body.proximaExecucao) {

      errors.push({
        property: 'proximaExecucao',
        constraints: {
          required:
            'Informe a próxima execução da manutenção preventiva.',
        },
      } as any);

    }

  }

  if (errors.length > 0) {

    const erros:
      Record<string, string> = {};

    errors.forEach(
      (error) => {

        erros[
          error.property
        ] =
          Object.values(
            error.constraints ?? {},
          )[0];

      },
    );

    const prioridades =
      await this.manutencoesService
        .findPrioridades();

    const fornecedores =
      await this.manutencoesService
        .findFornecedores();

    const equipamentos =
      await this.equipamentoService
        .findAllAtivos();

    return res.render(
      'manutencoes/formulario-cadastro',
      {

        layout:
          'layouts/main',

        title:
          'Nova Solicitação',

        prioridades,

        fornecedores,

        equipamentos,

        erros,

        dados: body,

      },
    );

  }

  const manutencao =
    await this.manutencoesService
      .create({

        tipo: body.tipo,

        local: body.local,

        descricao:
          body.descricao,

        responsavel:
          body.responsavel,

        valor:
          Number(
            body.valor,
          ),

        status:
          'aberto',

        dataSolicitacao:
          new Date(),

        prioridadeId:
          Number(
            body.prioridadeId,
          ),

        fornecedorId:
          body.fornecedorId
            ? Number(
                body.fornecedorId,
              )
            : null,

        equipamentoId:
          body.equipamentoId
            ? Number(
                body.equipamentoId,
              )
            : null,

        preventiva:
          body.preventiva ===
          'true',

        periodicidade:
          body.periodicidade ||
          null,

        proximaExecucao:
          body.proximaExecucao ||
          null,

      });

  if (foto) {

    await this.fotoService.create({

      nomeArquivo:
        foto.filename,

      manutencao,

    });

  }

  await this.manutencoesService
    .adicionarHistorico(

      manutencao.id,

      manutencao.status,

    );

  return res.redirect(
    '/manutencoes',
  );

}

  // =========================
  // EDITAR
  // =========================

  @Get('editar/:id')
  @Render('manutencoes/formulario-atualizacao')
  async editar(
    @Param('id') id: number,
  ) {

    const manutencao =
      await this.manutencoesService.findById(id);

    const prioridades =
      await this.manutencoesService.findPrioridades();

    const fornecedores =
      await this.manutencoesService.findFornecedores();
    
    const equipamentos =
      await this.equipamentoService.findAllAtivos();

    return {

      layout: 'layouts/main',

      title: 'Editar Solicitação',

      manutencao,

      prioridades,

      fornecedores,

      equipamentos,

      erros: {},

    };

  }

  // =========================
  // ATUALIZAR
  // =========================

  @Post('atualizar/:id')
  @UseInterceptors(
  FileInterceptor('foto', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, callback) => {
        const nomeArquivo =
          Date.now() + extname(file.originalname);

        callback(null, nomeArquivo);
      },
    }),
  }),
)
  async atualizar(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() foto: Express.Multer.File,
    @Res() res: Response,
  ) {

    const dto =
      plainToInstance(
        CreateManutencaoDto,
        body,
      );

    const errors =
      await validate(dto);

      if (
  body.preventiva === 'true'
) {

  if (!body.periodicidade) {

    errors.push({
      property: 'periodicidade',
      constraints: {
        required:
          'Informe a periodicidade da manutenção preventiva.',
      },
    } as any);

  }

  if (!body.proximaExecucao) {

    errors.push({
      property: 'proximaExecucao',
      constraints: {
        required:
          'Informe a próxima execução da manutenção preventiva.',
      },
    } as any);

  }

}

    // =========================
    // VALIDAÇÃO
    // =========================

    if (errors.length > 0) {

      const erros: Record<string, string> = {};

      errors.forEach((error) => {

        erros[error.property] =
          Object.values(
            error.constraints ?? {},
          )[0];

      });

      const prioridades =
        await this.manutencoesService.findPrioridades();

      const fornecedores =
        await this.manutencoesService.findFornecedores();

      const equipamentos =
        await this.equipamentoService.findAllAtivos();

      return res.render(
        'manutencoes/formulario-atualizacao',
        {

          layout: 'layouts/main',

          title: 'Editar Solicitação',

          manutencao: {
            id,
            ...body,
          },

          prioridades,

          fornecedores,

          equipamentos,

          erros,

        },
      );

    }

    // =========================
    // STATUS FORMATADO
    // =========================

    const statusFormatado = String(
      body.status || '',
    )
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

    // =========================
    // DADOS UPDATE
    // =========================

    const dadosAtualizacao: any = {

      tipo: body.tipo,

      local: body.local,

      responsavel: body.responsavel,

      descricao: body.descricao,

      status: body.status,

    preventiva:
    body.preventiva === 'true',

    periodicidade:
    body.periodicidade || null,

    proximaExecucao:
    body.proximaExecucao || null,

    prioridadeId: Number(
    body.prioridadeId,
  ),

  fornecedorId: body.fornecedorId
    ? Number(body.fornecedorId)
    : null,
  
  equipamentoId: body.equipamentoId
    ? Number(body.equipamentoId)
    : null,

  valor:
    statusFormatado.includes('cancel')
      ? 0
      : Number(body.valor),

    };

    // =========================
    // DATA CONCLUSÃO
    // =========================

    if (
      statusFormatado === 'concluido' ||
      statusFormatado === 'concluida'
    ) {

      dadosAtualizacao.dataConclusao =
        new Date();

    }

    const manutencaoAtual =
    await this.manutencoesService.findById(
    Number(id),
    );

    await this.manutencoesService.update(
    Number(id),
     dadosAtualizacao,
    );

    if (foto) {

    await this.fotoService.create({
    nomeArquivo: foto.filename,
    manutencao: {
      id: Number(id),
    } as Manutencao,
    });

  }

    if (
     manutencaoAtual &&
    manutencaoAtual.status !== body.status
     ) {

     await this.manutencoesService
    .adicionarHistorico(
      Number(id),
      body.status,
    );

   }

   return res.redirect(
   `/manutencoes?sucesso=${encodeURIComponent(
    body.descricao,
   )}`,
  );
 }

  @Get('historico/:id')
  @Render('manutencoes/historico')
   async historico(
   @Param('id') id: number,
  ) {

  const manutencao =
    await this.manutencoesService.findById(
      Number(id),
    );

  const historico =
    await this.manutencoesService.buscarHistorico(
      Number(id),
    );

  return {

    layout: 'layouts/main',

    title: 'Histórico da Solicitação',

    manutencao,

    historico,

    

  };

 }

  // =========================
  // EXCLUIR
  // =========================

  @Post('excluir/:id')
  async excluir(
    @Param('id') id: number,
    @Res() res: Response,
  ) {

    await this.manutencoesService.delete(id);

    return res.redirect('/manutencoes');

  }

  // =========================
  // IMPRIMIR
  // =========================

  @Get('imprimir/:id')
  @Render('manutencoes/imprimir')
   async imprimir(
  @Param('id') id: number,
  ) {

  const manutencao =
    await this.manutencoesService.findById(id);

  const historico =
    await this.manutencoesService.buscarHistorico(id);

  return {

    layout: 'layouts/empty',

    manutencao,

    historico,

  };

}

}