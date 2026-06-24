import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('fornecedor')
export class Fornecedor {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  empresa!: string;

  @Column()
  telefone!: string;

  @Column()
  status!: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  criadoEm!: Date;

}