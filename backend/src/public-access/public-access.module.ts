import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicAccessController } from './public-access.controller';
import { PublicAccessService } from './public-access.service';
import {
  SessionCookieGuard,
  LoginSessionGuard,
  GrievanceSessionGuard,
} from './cookie.guard';

@Module({
  imports: [ConfigModule],
  controllers: [PublicAccessController],
  providers: [
    PublicAccessService,
    SessionCookieGuard,
    LoginSessionGuard,
    GrievanceSessionGuard,
  ],
  exports: [
    PublicAccessService,
    SessionCookieGuard,
    LoginSessionGuard,
    GrievanceSessionGuard,
  ],
})
export class PublicAccessModule {}

