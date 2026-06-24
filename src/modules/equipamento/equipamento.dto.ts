import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEquipamentoDto {

  @IsString()
  @IsNotEmpty({ message: 'Informe o nome do equipamento.' })
  nome!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o patrimônio.' })
  patrimonio!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a marca.' })
  marca!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o modelo.' })
  modelo!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a localização.' })
  localizacao!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o status.' })
  status!: string;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsString()
  foto?: string;
}