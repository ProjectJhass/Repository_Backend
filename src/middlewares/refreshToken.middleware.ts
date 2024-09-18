import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtPasswordChangeAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      this.jwtService.verify(token);
      return true; 
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
       
        const refreshToken = request.body.refreshToken || request.headers['x-refresh-token'];

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token no proporcionado');
        }

        const newTokens = await this.authService.refreshTokens(refreshToken);

       
        request.headers.authorization = `Bearer ${newTokens.token}`;
        return true; 
      }

      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
