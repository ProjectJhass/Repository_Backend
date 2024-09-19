// src/chat/dto/chat.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

// export class ChatHistory {
//     @ApiProperty()
//     role: string;

//     @ApiProperty({ type: () => [String] }) // Specify that parts is an array of strings
//     parts: string[];
// }

export class ChatDto {
    @IsArray()
    history: [];

    @IsString()
    question: string;
}
