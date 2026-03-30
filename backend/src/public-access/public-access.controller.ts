import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PublicAccessService } from './public-access.service';

@Controller('public')
export class PublicAccessController {
  constructor(
    private readonly publicAccessService: PublicAccessService,
    private readonly configService: ConfigService,
  ) {}

  @Get('session/:scope')
  createSession(
    @Param('scope') scope: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const scoped = scope.toLowerCase();
    const allowedScopes = ['grievance_submit', 'login', 'generic'];

    if (!allowedScopes.includes(scoped)) {
      return {
        message: 'Unsupported session scope',
      };
    }

    const token = this.publicAccessService.generateSessionToken(scoped);

    const cookieName =
      this.configService.get<string>('COOKIE_NAME') || 'session_sid';

    const maxAge = Number(this.configService.get('COOKIE_MAX_AGE')) || 600000;

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge,
      path: '/',
    });

    return {
      message: `${scoped} session created successfully`,
    };
  }

  @Get('grievance-session')
  createGrievanceSession(@Res({ passthrough: true }) res: Response) {
    return this.createSession('grievance_submit', res);
  }

  @Get('login-session')
  createLoginSession(@Res({ passthrough: true }) res: Response) {
    return this.createSession('login', res);
  }
}