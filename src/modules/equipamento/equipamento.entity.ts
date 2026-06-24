import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('equipamento')
export class Equipamento {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  nome!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  patrimonio!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  marca!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  modelo!: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  localizacao!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'Ativo',
  })
  status!: string;

}