import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Fornecedor } from './fornecedor.entity';

@Injectable()
export class FornecedorService {

  private fornecedorRepository: Repository<Fornecedor>;

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {

    this.fornecedorRepository =
      this.dataSource.getRepository(Fornecedor);

  }

  async findAll(): Promise<Fornecedor[]> {

    return this.fornecedorRepository.find();

  }

  async findOne(
    id: number,
  ): Promise<Fornecedor | null> {

    return this.fornecedorRepository.findOne({

      where: { id },

    });

  }

  async create(
    dados: Partial<Fornecedor>,
  ): Promise<Fornecedor> {

    const fornecedor =
      this.fornecedorRepository.create({

        ...dados,

      });

    return this.fornecedorRepository.save(
      fornecedor,
    );

  }

  async update(
    id: number,
    dados: Partial<Fornecedor>,
  ): Promise<Fornecedor | null> {

    const fornecedor =
      await this.findOne(id);

    if (!fornecedor) {

      return null;

    }

    Object.assign(
      fornecedor,
      {
        ...dados,
      },
    );

    return this.fornecedorRepository.save(
      fornecedor,
    );

  }

  async delete(
    id: number,
  ): Promise<Fornecedor | null> {

    const fornecedor =
      await this.findOne(id);

    if (!fornecedor) {

      return null;

    }

    await this.fornecedorRepository.remove(
      fornecedor,
    );

    return fornecedor;

  }

}