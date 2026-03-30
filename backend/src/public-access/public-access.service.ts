import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PublicAccessService {
  constructor(private readonly configService: ConfigService) {}

  generateSessionToken(scope: string) {
    const now = Date.now();
    const maxAge = Number(this.configService.get('COOKIE_MAX_AGE')) || 600000;

    const payload = {
      scope,
      nonce: crypto.randomBytes(16).toString('hex'),
      iat: now,
      exp: now + maxAge,
    };

    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = this.sign(payloadBase64);

    return `${payloadBase64}.${signature}`;
  }

  validateSessionToken(token: string, expectedScope?: string) {
    if (!token) {
      throw new UnauthorizedException('Session cookie missing');
    }

    const parts = token.split('.');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Invalid session cookie format');
    }

    const [payloadBase64, receivedSignature] = parts;
    const expectedSignature = this.sign(payloadBase64);

    if (receivedSignature !== expectedSignature) {
      throw new UnauthorizedException('Invalid session signature');
    }

    let payload: any;
    try {
      payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    } catch {
      throw new UnauthorizedException('Invalid session payload');
    }

    if (!payload || !payload.scope) {
      throw new UnauthorizedException('Session scope missing');
    }

    if (expectedScope && payload.scope !== expectedScope) {
      throw new UnauthorizedException('Session scope mismatch');
    }

    if (!payload.exp || Date.now() > payload.exp) {
      throw new UnauthorizedException('Session expired');
    }

    return payload;
  }

  // Backward compat: convenience methods
  generateGrievanceSessionToken() {
    return this.generateSessionToken('grievance_submit');
  }

  validateGrievanceSessionToken(token: string) {
    return this.validateSessionToken(token, 'grievance_submit');
  }

  generateLoginSessionToken() {
    return this.generateSessionToken('login');
  }

  validateLoginSessionToken(token: string) {
    return this.validateSessionToken(token, 'login');
  }

  private sign(data: string) {
    const secret = this.configService.get<string>('COOKIE_SECRET') || 'default_secret';

    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }
}