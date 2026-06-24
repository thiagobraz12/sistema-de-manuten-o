import {
  Injectable,
  Inject,
} from '@nestjs/common';

import {
  DataSource,
  Repository,
} from 'typeorm';

import { Equipamento }
from './equipamento.entity';

@Injectable()
export class EquipamentoService {

  private equipamentoRepository:
    Repository<Equipamento>;

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {

    this.equipamentoRepository =
      this.dataSource.getRepository(
        Equipamento,
      );

  }

  async findAll(): Promise<Equipamento[]> {

  return this.equipamentoRepository.find();

}

async findAllAtivos(): Promise<Equipamento[]> {

  return this.equipamentoRepository.find({

    where: {

      status: 'Ativo',

    },

    order: {

      nome: 'ASC',

    },

  });

}

  async findOne(
    id: number,
  ): Promise<Equipamento | null> {

    return this.equipamentoRepository.findOne({

      where: { id },

    });

  }

  async create(
    dados: Partial<Equipamento>,
  ): Promise<Equipamento> {

    const equipamento =
      this.equipamentoRepository.create({

        ...dados,

      });

    return this.equipamentoRepository.save(
      equipamento,
    );

  }

  async update(
    id: number,
    dados: Partial<Equipamento>,
  ): Promise<Equipamento | null> {

    const equipamento =
      await this.findOne(id);

    if (!equipamento) {

      return null;

    }

    Object.assign(
      equipamento,
      {
        ...dados,
      },
    );

    return this.equipamentoRepository.save(
      equipamento,
    );

  }

  async delete(
    id: number,
  ): Promise<Equipamento | null> {

    const equipamento =
      await this.findOne(id);

    if (!equipamento) {

      return null;

    }

    await this.equipamentoRepository.remove(
      equipamento,
    );

    return equipamento;

  }

}