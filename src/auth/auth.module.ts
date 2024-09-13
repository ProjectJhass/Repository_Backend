import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CompaniesModule } from 'src/companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { ResetToken } from './entities/reset-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from 'src/roles/roles.module';
import { ProfileModule } from 'src/profile/profile.module';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    CompaniesModule,
    RolesModule,
    ProfileModule,
    TypeOrmModule.forFeature([RefreshToken, ResetToken]),
    JwtModule.registerAsync({
     imports:[ConfigModule],
     useFactory: async (configService: ConfigService) =>({
      secret:configService.get<string>("JWT_SECRET"),
      signOptions:{expiresIn:'1m'}
     }),
     inject:[ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
