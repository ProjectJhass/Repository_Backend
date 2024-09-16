import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './entities/refresh-token.entity';
import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { LoginCompanyDto } from './dto/loginCompany.dto';
import { RegisterCompanyDto } from './dto/registerCompany.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { nanoid } from 'nanoid';
import { v4 as uuidv4} from 'uuid';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetToken } from './entities/reset-token.entity';
import { ProfileService } from 'src/profile/profile.service';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly companiesService: CompaniesService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository <ResetToken>,
    private readonly configService :ConfigService,
    private readonly profileService:ProfileService,
    private readonly rolesService:RolesService,
  ) {}

  async register({ nombre, correo, contraseña, edad, telefono, apellido }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(correo);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    return await this.usersService.create({
      nombre,
      edad,
      telefono,
      apellido,
      correo,
      contraseña: hashedPassword,
    });
  }

  async restoreUser({id}){

   return await this.usersService.restoreUserById(id)
  }

  
  async login({ correo, contraseña }: LoginDto) {
    const user = await this.usersService.findOneByEmail(correo);
    
    if (!user) {
      throw new UnauthorizedException('El correo electrónico es incorrecto');
    }

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    // const payload = { correo: user.correo, id_usuario: user.id_usuario };
    // const token = await this.jwtService.signAsync(payload);

  //   return {
  //     token,
  //     correo
  // };
    return this.tokens(user.id_usuario);
  }

  async refreshTokens(refreshToken: string){
      const token = await this.refreshTokenRepository.findOne({
       where: {
        token: refreshToken,
        expiryDate: MoreThan( new Date()),
      },
      });

      if (!token) {
          throw new UnauthorizedException("refresh token es invalido")
      }

      return this.tokens(token.id_usuario)
  }

  async tokens(id_usuario: number) {
    const users = await this.usersService.findOne(id_usuario);

    if (!users) {
      throw new NotFoundException('Usuario no encontrado por id');
    }

    const payload = { correo: users.correo, id_usuario: users.id_usuario };
    const token = await this.jwtService.signAsync(payload, {expiresIn: '1m'});
    const refreshToken =uuidv4();
    
    await this.storeRefreshToken(refreshToken, id_usuario)
    return {
        token,
        refreshToken,
        correo: users.correo,
    };
  }

    async storeRefreshToken(token: string, id_usuario){
      
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 1);

     const refreshToken =await this.refreshTokenRepository.create({
      token,
      id_usuario,
      expiryDate
     });
     await this.refreshTokenRepository.save(refreshToken);
    }


  async registerCompany({ email, name, sector, description,type,address }: RegisterCompanyDto) {
    
      const company = await this.usersService.findOneByEmail(email);

    if (company) {
      throw new BadRequestException('La empresa ya existe');
    }

    return await this.companiesService.create({
      name,
      sector,
      description,
      type,
      email,
      address,
    });  
  }

  async loginCompany({ email, companyId, userId, roleId }: LoginCompanyDto) {
    const companyUser= await this.companiesService.findOneByEmail(email);
    const role= this.rolesService.findOne(roleId);
    
    if (!companyUser) {
      throw new UnauthorizedException('El correo electrónico es incorrecto');
    }

    const payload = { email: email, rol: roleId, rank: (await role).rank };
    const token = await this.jwtService.signAsync(payload);

    this.profileService.create({roleId, userId, companyId})

    return {
      token
    };
  }
  async changePassword(id_usuario: number, oldPassword: string, newPassword: string) {
    const user = await this.usersService.findOne(id_usuario);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    const passwordMatch = await bcrypt.compare(oldPassword, user.contraseña);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.contraseña = newHashedPassword;
    await this.usersService.saveUser(user);
    
    return { message: 'Contraseña cambiada con éxito' };
  }
}
