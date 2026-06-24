import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Prioridade } from './prioridade.entity';

@Injectable()
export class PrioridadeService {
  private repository;

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Prioridade);
  }

  findAll() {
    return this.repository.find();
  }

  async seed() {
    const count = await this.repository.count();
    if (count === 0) {
      await this.repository.save([
        { nome: 'Baixa' },
        { nome: 'Média' },
        { nome: 'Alta' },
      ]);
    }
  }
}


