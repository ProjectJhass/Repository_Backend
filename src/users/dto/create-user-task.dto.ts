import { IsNumber, Min } from "class-validator";

export class CreateUserTaskDto {

  @IsNumber()
  @Min(0)
  user_id:number

  @IsNumber()
  @Min(0)
  task_id:number;
  
}
