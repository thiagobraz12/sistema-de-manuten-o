import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Manutencao } from '../manutencao.entity';

@Entity()
export class Prioridade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @OneToMany(() => Manutencao, (m) => m.prioridade)
  manutencoes!: Manutencao[];
}
