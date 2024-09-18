import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { Task } from 'src/task/entities/task.entity';

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

  @IsOptional()
  @IsUrl()
  fotoPerfil?: string; // Nuevo campo para la URL de la foto de perfil


  @IsNumber()
  @Min(1)
  edad: number;
  task: Task[];



}
