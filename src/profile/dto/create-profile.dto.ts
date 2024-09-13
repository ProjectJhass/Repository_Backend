import { Transform } from "class-transformer";
import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProfileDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    roleId:number;

    @IsNumber()
    @Min(1)
    userId: number;

    @IsNumber()
    @Min(1)
    companyId: number;
}
