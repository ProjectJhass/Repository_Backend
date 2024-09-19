import { IsNumber, Min } from "class-validator";

export class CreateProfileDto {

    @IsNumber()
    @Min(1)
    roleId: number;

    @IsNumber()
    @Min(1)
    userId: number;

    @IsNumber()
    @Min(1)
    companyId: number;
}