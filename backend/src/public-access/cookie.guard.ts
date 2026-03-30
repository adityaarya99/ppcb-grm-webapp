import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PublicAccessService } from './public-access.service';

@Injectable()
export class SessionCookieGuard implements CanActivate {
  protected expectedScope?: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly publicAccessService: PublicAccessService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const cookieName =
      this.configService.get<string>('COOKIE_NAME') || 'session_sid';

    const token =
      request.cookies && cookieName ? request.cookies[cookieName] : '';

    if (!token) {
      throw new UnauthorizedException('session cookie not found');
    }

    const payload = this.publicAccessService.validateSessionToken(
      token,
      this.expectedScope,
    );

    (request as any).Session = payload;

    return true;
  }
}

// Scope-specific guard instances
@Injectable()
export class LoginSessionGuard extends SessionCookieGuard {
  constructor(
    configService: ConfigService,
    publicAccessService: PublicAccessService,
  ) {
    super(configService, publicAccessService);
    this.expectedScope = 'login';
  }
}

@Injectable()
export class GrievanceSessionGuard extends SessionCookieGuard {
  constructor(
    configService: ConfigService,
    publicAccessService: PublicAccessService,
  ) {
    super(configService, publicAccessService);
    this.expectedScope = 'grievance_submit';
  }
}