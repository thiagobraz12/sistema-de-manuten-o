import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  async validarLogin(
    email: string,
    senha: string,
  ): Promise<boolean> {

    return (
      email === 'admin@gmail.com' &&
      senha === '123456'
    );

  }

}