import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString, Min, MinLength } from "class-validator";
import { ManyToMany } from "typeorm";

export class CreateNoveltyDto {
    @Transform (({value}) => value.trim())
    @IsString()
    @MinLength(1)
    description: string;


    @IsDate()
    detection_date: Date;


    @Transform (({value}) => value.trim())
    @IsString()
    @MinLength(1)
    state: string;

    
}
