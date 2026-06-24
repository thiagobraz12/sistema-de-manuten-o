import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Manutencao }
from '../manutencao.entity';

@Entity('foto')
export class Foto {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nomeArquivo!: string;

  @ManyToOne(
    () => Manutencao,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'manutencaoId',
  })
  manutencao!: Manutencao;

}