import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterCompanyDto } from './dto/registerCompany.dto';
import { LoginCompanyDto } from './dto/loginCompany.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
  
  @Post('registerCompany')
  registerCompany(
    @Body()
    registerCompanyDto: RegisterCompanyDto,
  ) {
    return this.authService.registerCompany(registerCompanyDto);
  }

  @Post('loginCompany')
  loginCompany(
    @Body()
    loginCompanyDto: LoginCompanyDto,
  ) {
    return this.authService.loginCompany(loginCompanyDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user;
  }
}
