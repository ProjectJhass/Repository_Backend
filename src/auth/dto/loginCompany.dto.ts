import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class LoginCompanyDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(1)
  companyId: number;

  @IsNumber()
  @Min(1)
  userId: number;

  @IsNumber()
  @Min(1)
  roleId: number
}