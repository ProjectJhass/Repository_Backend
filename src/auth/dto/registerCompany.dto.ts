import { Transform } from 'class-transformer';
import { IsEmail, IsString,  MinLength } from 'class-validator';

export class RegisterCompanyDto {


    @IsEmail()
    email: string;
  
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    sector: string;
  
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;
  
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    description:string;
  
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    type:string;
  
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    address:string;

}
