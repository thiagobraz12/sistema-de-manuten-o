import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Manutencao } from './manutencao.entity';

@Entity('historico_status')
export class HistoricoStatus {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  status!: string;

  @Column({
    type: 'datetime',
  })
  data!: Date;

  @ManyToOne(
    () => Manutencao,
    (manutencao) => manutencao.historicos,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'manutencaoId',
  })
  manutencao!: Manutencao;

}