import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Prioridade } from './prioridade/prioridade.entity';
import { Fornecedor } from './fornecedor/fornecedor.entity';
import { Equipamento } from './equipamento/equipamento.entity';
import { OneToMany,} from 'typeorm';
import { Foto } from './foto/foto.entity';
import { HistoricoStatus } from './historico-status.entity';

@Entity('manutencao')
export class Manutencao {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  tipo!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  local!: string;

  @Column({
    type: 'text'
  })
  descricao!: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  responsavel!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  valor!: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  status!: string;

  @Column({
    default: false,
  })
  preventiva!: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  periodicidade!: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  proximaExecucao!: Date;

  @Column({
    type: 'datetime',
    nullable: true
  })
  dataSolicitacao!: Date;

  @Column({
    type: 'datetime',
    nullable: true
  })
  dataConclusao!: Date;

  @ManyToOne(() => Prioridade)
  @JoinColumn({
    name: 'prioridadeId',
  })
  prioridade!: Prioridade;

  @ManyToOne(() => Fornecedor, {
    nullable: true,
  })
  @JoinColumn({
    name: 'fornecedorId',
  })
  fornecedor!: Fornecedor;

  @ManyToOne(
  () => Equipamento,
  {
    nullable: true,
  },
  )
  @JoinColumn({
  name: 'equipamentoId',
  })
  equipamento!: Equipamento;

  @OneToMany(
  () => Foto,
  (foto) => foto.manutencao,
  )
  fotos!: Foto[];

  @OneToMany(
  () => HistoricoStatus,
  (historico) => historico.manutencao,
)
  historicos!: HistoricoStatus[];

}