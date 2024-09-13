import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateRoleDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;
  
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    description: string;

    @IsNumber()
    @Min(0)
    rank: number;

    @IsNumber()
    @Min(0)
    companyId: number;
}
