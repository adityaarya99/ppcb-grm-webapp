
import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_SEED } from './data/login.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './login.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,) { }

  async onModuleInit() {
    await this.seedLogin();
  }

  async login(user: any) {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);

    await this.loginRepository.update(user.id, {
      is_logged_in: true,
      last_login_at: new Date(),
      session_expiry: expiry,
    });

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      expires_at: expiry,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.loginRepository.findOne({
      where: {
        username: username,
        status: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    if (
      user.is_logged_in &&
      user.session_expiry &&
      new Date(user.session_expiry) > new Date()
    ) {
      throw new UnauthorizedException('User already logged in');
    }
    return user;
  }

  async seedLogin() {
    const count = await this.loginRepository.count();
    if (count > 0) {
      console.log('⚠️ Logins already exist, skipping seed');
      return;
    }
    const loginsData = await LOGIN_SEED();
    const logins = this.loginRepository.create(loginsData);
    await this.loginRepository.save(logins);
    console.log('Logins seeded successfully');
  }

  async logout(userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Invalid user');
    }
    await this.loginRepository.update(userId, {
      is_logged_in: false,
      session_expiry: undefined,
    });

    return {
      message: 'Logged out successfully',
    };
  }

}