import {
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateManutencaoDto {

  @IsNotEmpty({
    message: 'Selecione o tipo de manutenção.',
  })
  tipo!: string;

  @IsNotEmpty({
    message: 'Informe o local da manutenção.',
  })
  @MinLength(3, {
    message: 'O local deve ter no mínimo 3 caracteres.',
  })
  local!: string;

  @IsNotEmpty({
    message: 'Informe a descrição da manutenção.',
  })
  @MinLength(5, {
    message: 'A descrição deve ter no mínimo 5 caracteres.',
  })
  descricao!: string;

  @IsNotEmpty({
    message: 'Informe o responsável.',
  })
  @MinLength(3, {
    message: 'O responsável deve ter no mínimo 3 caracteres.',
  })
  responsavel!: string;

  @IsNotEmpty({
    message: 'Informe o valor da manutenção.',
  })
  valor!: number;

  @IsNotEmpty({
    message: 'Selecione a prioridade.',
  })
  prioridadeId!: number;

  @IsNotEmpty({
    message: 'Selecione um fornecedor.',
  })
  fornecedorId!: number;

  // NOVO CAMPO
  @IsNotEmpty({
    message: 'Selecione o status da manutenção.',
  })
  status!: string;

  @IsOptional()
  preventiva?: boolean;

  @IsOptional()
  periodicidade?: string;

  @IsOptional()
  proximaExecucao?: Date;
}

export class UpdateManutencaoDto
  extends CreateManutencaoDto {}