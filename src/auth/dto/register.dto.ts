import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  apellido: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(10)
  telefono: string;

  @IsEmail()
  correo: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contraseña: string;


  @IsNumber()
  @Min(1)
  edad: number;

  @IsOptional() 
  @IsString()
  fotoPerfil?: string; 

}
