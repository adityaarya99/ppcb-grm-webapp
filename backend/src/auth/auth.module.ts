
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PublicAccessModule } from '../public-access/public-access.module';
import { Login } from './login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './jwt-auth.guard'; // 👈 ADD THIS

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]), 
    JwtModule.register({
      secret: 'MY_SECRET_KEY',
      signOptions: { expiresIn: '10m' },
    }), PublicAccessModule
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [
    JwtAuthGuard,
    TypeOrmModule, 
  ],
  controllers: [AuthController],
})
export class AuthModule { }



