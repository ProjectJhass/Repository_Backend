import { Transform } from 'class-transformer';
import {IsString, MinLength } from 'class-validator';

export class CreateTaskDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    title_task: string;


    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    start_date: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    time_start: string;

    

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    end_date: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    time_end: string;

}
