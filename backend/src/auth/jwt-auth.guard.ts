import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './login.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 🔥 THIS WAS FAILING BEFORE
    const dbUser = await this.loginRepository.findOne({
      where: { id: user.sub },
    });

    if (!dbUser || !dbUser.session_expiry) {
      throw new UnauthorizedException('Session expired');
    }

    if (new Date(dbUser.session_expiry) < new Date()) {
      await this.loginRepository.update(dbUser.id, {
        is_logged_in: false,
        session_expiry: undefined,
      });

      throw new UnauthorizedException('Session expired');
    }

    return result;
  }
}