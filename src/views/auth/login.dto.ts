import {
  IsEmail,
  IsNotEmpty,
  MinLength
} from 'class-validator';

export class LoginDto {

  @IsNotEmpty({
    message: 'O e-mail é obrigatório'
  })
  @IsEmail(
    {},
    {
      message: 'Digite um e-mail válido'
    }
  )
  email!: string;

  @IsNotEmpty({
    message: 'A senha é obrigatória'
  })
  @MinLength(4, {
    message:
      'A senha deve ter no mínimo 4 caracteres'
  })
  senha!: string;

}