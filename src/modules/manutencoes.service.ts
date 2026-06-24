
import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

import { DataSource, Repository } from 'typeorm';

import { Manutencao } from './manutencao.entity';

import { Prioridade } from './prioridade/prioridade.entity';

import { Fornecedor } from './fornecedor/fornecedor.entity';
import { HistoricoStatus } from './historico-status.entity';

import {
  CreateManutencaoDto,
  UpdateManutencaoDto,
} from './manutencao.dto';

import { DATABASE_SOURCE } from '../constants/database-source';

@Injectable()
export class ManutencoesService {

  private repository: Repository<Manutencao>;

  private prioridadeRepository: Repository<Prioridade>;

  private fornecedorRepository: Repository<Fornecedor>;
  
  private historicoStatusRepository: Repository<HistoricoStatus>;

  constructor(
    @Inject(DATABASE_SOURCE)
    private dataSource: DataSource,
  ) {

    this.repository =
      this.dataSource.getRepository(
        Manutencao,
      );

    this.prioridadeRepository =
      this.dataSource.getRepository(
        Prioridade,
      );

    this.fornecedorRepository =
      this.dataSource.getRepository(
        Fornecedor,
      );

    this.historicoStatusRepository =
      this.dataSource.getRepository(
        HistoricoStatus,
      );

    }

    // =========================
    // HISTÓRICO DE STATUS
    // =========================

    async adicionarHistorico(
    manutencaoId: number,
    status: string,
    ) {

    const historico =
      this.historicoStatusRepository.create({

        status,

        data: new Date(),

        manutencao: {
          id: manutencaoId,
        } as any,

      });

     return this.historicoStatusRepository.save(
      historico,
    );

  }

     async buscarHistorico(
    manutencaoId: number,
     ) {

     return this.historicoStatusRepository.find({

      where: {

        manutencao: {
          id: manutencaoId,
        },

      },

      order: {
        data: 'ASC',
      },

      relations: [
        'manutencao',
        
      ],

    });

  }

  // =========================
  // MANUTENÇÕES
  // =========================

  findAll() {

    return this.repository.find({

      relations: [
        'prioridade',
        'fornecedor',
        'equipamento',
      ],

    });

  }

  findById(id: number) {

    return this.repository.findOne({

      where: { id },

      relations: [
        'prioridade',
        'fornecedor',
        'equipamento',
         'fotos',
      ],

    });

  }

   async create(
    dto: any,
   ): Promise<Manutencao> {

   const manutencao =
    this.repository.create({

      ...dto,

      preventiva:
        dto.preventiva === true ||
        dto.preventiva === 'true',

      prioridade: {
        id: Number(dto.prioridadeId),
      },

      fornecedor: dto.fornecedorId
        ? {
            id: Number(dto.fornecedorId),
          }
        : null,
        
      equipamento: dto.equipamentoId
       ? {
       id: Number(dto.equipamentoId),
       }
       : null,


    });

    const resultado =
    await this.repository.save(
      manutencao as any,
    );

    return resultado as Manutencao;


  }

  async update(
  id: number,
  dto: any,
  ): Promise<void> {

  await this.repository.save({

     id,

  ...dto,

  preventiva:
    dto.preventiva === true ||
    dto.preventiva === 'true',

  prioridade: {
    id: Number(dto.prioridadeId),
  },

  fornecedor: dto.fornecedorId
    ? {
        id: Number(dto.fornecedorId),
      }
    : null,

  equipamento: dto.equipamentoId
    ? {
        id: Number(dto.equipamentoId),
      }
    : null,
  });

 }

  async delete(id: number): Promise<void> {

  const manutencao = await this.repository.findOne({
    where: { id },
    relations: ['fotos'],
  });

  if (!manutencao) {
    throw new NotFoundException('Manutenção não encontrada.');
  }

  if (manutencao.fotos?.length) {

    for (const foto of manutencao.fotos) {

      const arquivo = path.join(
        process.cwd(),
        'public',
        'uploads',
        foto.nomeArquivo,
      );

      if (fs.existsSync(arquivo)) {
        fs.unlinkSync(arquivo);
      }

    }

  }

  await this.repository.remove(manutencao);

}

  // =========================
  // PRIORIDADES
  // =========================

  findPrioridades() {

    return this.prioridadeRepository.find();

  }
  // =========================
  // FORNECEDORES
  // =========================

  findFornecedores() {

    return this.fornecedorRepository
      .createQueryBuilder('f')
      .where(
        'LOWER(f.status) = :status',
        {
          status: 'ativo',
        },
      )
      .orderBy(
        'f.empresa',
        'ASC',
      )
      .getMany();

  }
  // =========================
  // TOTAL GASTO
  // =========================

  async getTotalGasto() {

    const resultado =
      await this.repository
        .createQueryBuilder('m')
        .select(
          'SUM(m.valor)',
          'total',
        )
        .where(
          'LOWER(TRIM(m.status)) != :status',
          {
            status: 'cancelado',
          },
        )
        .getRawOne();

    return Number(
      resultado.total || 0,
    );

  }
 
}