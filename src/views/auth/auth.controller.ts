import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  // =========================
  // LOGIN PAGE
  // =========================

  @Get('/')
  @Render('auth/login')
  loginPage() {

    return {

      layout: 'layouts/empty',

      error: null,

    };

  }

  // =========================
  // LOGIN
  // =========================

  @Post('/login')
  async login(
    @Body() body: any,
    @Res() res: Response,
  ) {

    const dto =
      plainToInstance(
        LoginDto,
        body,
      );

    const errors =
      await validate(dto);

    if (errors.length > 0) {

      const erros: Record<string, string> = {};

      errors.forEach((error) => {

        erros[error.property] =
          Object.values(
            error.constraints ?? {},
          )[0];

      });

      return res.render(
        'auth/login',
        {

          layout: 'layouts/empty',

          email: body.email,

          emailError: erros.email,

          senhaError: erros.senha,

          loginError: null,

        },
      );

    }

    const autenticado =
      await this.authService.validarLogin(
        body.email,
        body.senha,
      );

    if (autenticado) {

      return res.redirect(
        '/dashboard',
      );

    }

    return res.render(
      'auth/login',
      {

        layout: 'layouts/empty',

        email: body.email,

        emailError: null,

        senhaError: null,

        loginError:
          'Usuário ou senha inválidos',

      },
    );

  }

}