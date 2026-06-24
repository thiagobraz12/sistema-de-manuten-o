import {
  IsNotEmpty,
} from 'class-validator';

export class CreateFornecedorDto {

  @IsNotEmpty({
    message: 'A empresa é obrigatória',
  })
  empresa!: string;

  @IsNotEmpty({
    message: 'O telefone é obrigatório',
  })
  telefone!: string;

  @IsNotEmpty({
    message: 'O status é obrigatório',
  })
  status!: string;

}