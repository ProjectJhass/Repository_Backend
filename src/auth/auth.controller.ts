import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { LoginCompanyDto } from './dto/loginCompany.dto';
import { RegisterCompanyDto } from './dto/registerCompany.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshTokenDto } from './dto/refresh-tokens.dto';
import { Roles } from './decorators/roles.decorator';
import { Rank } from './enums/rol.enum';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('registerCompany')
  registerCompany(@Request() req, @Body() registerCompanyDto: RegisterCompanyDto) {
    return this.authService.registerCompany(registerCompanyDto);
  }

  @Post('loginCompany')
  loginCompany(@Request() req, @Body() loginCompanyDto: LoginCompanyDto) {
    return this.authService.loginCompany(loginCompanyDto);
  }

  @Get('profile')
  @UseGuards(RolesGuard)
  @Roles (Rank.ONE)
  profile(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
      if (!refreshTokenDto) {
        throw new UnauthorizedException('Refresh token es requerido');
      }
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const id_usuario = req.user.id_usuario;
    return this.authService.changePassword(id_usuario, oldPassword, newPassword);
  }
}
