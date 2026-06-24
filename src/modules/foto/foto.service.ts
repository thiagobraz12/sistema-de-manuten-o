import {
  Injectable,
  Inject,
} from '@nestjs/common';

import {
  DataSource,
  Repository,
} from 'typeorm';

import { Foto }
from './foto.entity';

@Injectable()
export class FotoService {

  private fotoRepository:
    Repository<Foto>;

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {

    this.fotoRepository =
      this.dataSource.getRepository(
        Foto,
      );

  }

  async create(
    dados: Partial<Foto>,
  ): Promise<Foto> {

    const foto =
      this.fotoRepository.create(
        dados,
      );

    return this.fotoRepository.save(
      foto,
    );

  }

  async findByManutencao(
    manutencaoId: number,
  ) {

    return this.fotoRepository.find({

      where: {

        manutencao: {
          id: manutencaoId,
        },

      },

      relations: [
        'manutencao',
      ],

    });

  }
  

}