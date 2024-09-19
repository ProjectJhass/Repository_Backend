import { IsArray, IsString } from "class-validator";

export class ChatResponseDto {
  @IsArray()
    history: string[];
  
    @IsString()
    response: string;  
  }
  