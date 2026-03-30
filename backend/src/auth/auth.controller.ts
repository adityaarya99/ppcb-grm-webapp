
import { Controller, Post, Body, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSessionGuard } from '../public-access/cookie.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, // 👈 ADD THIS
  ) { }
  @UseGuards(LoginSessionGuard)
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('logout')
  async logout(@Req() req: any) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return { message: 'Logged out (no token)' };
      }

      const token = authHeader.split(' ')[1];

      const decoded: any = this.jwtService.verify(token);

      const userId = decoded.sub;

      return this.authService.logout(userId);
    } catch (err) {
      console.log("Logout decode error:", err);

      // even if token invalid → don't crash
      return { message: 'Logged out' };
    }
  }
}