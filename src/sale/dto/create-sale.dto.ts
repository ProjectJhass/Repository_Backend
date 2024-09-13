import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateSaleDto {
    @IsNumber()
    @Min(0)
    amount: number;
    
    @IsNumber()
    @Min(0)
    total_price: number;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    description: string;
}
