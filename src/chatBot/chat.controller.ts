// import { Body, Controller, Post } from "@nestjs/common";
// import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
// import { ChatBotService } from "./chat.service";
// import { CreateChatDto } from "src/auth/dto/chat.dto";
// import { ChatResponseDto } from "src/auth/dto/response.dto";

// @ApiTags('chat')
// @ApiBearerAuth()
// @Controller('chatbot')
// export class ChatBotController {
//     constructor(
//         private readonly chatBotService: ChatBotService
//     ){}

//     @Post('chat')
//   async chat(@Body() createChatDto: CreateChatDto): Promise<ChatResponseDto> {
//     const { history, question } = createChatDto;
//     const response = await this.chatBotService.getChatResponse(history, question);
//     return response;
//   }catch (error) {
//     console.error('Error en ChatBotController:', error);
//     throw error; // Re-lanzar el error para que sea manejado por el sistema de excepciones de NestJS
//   }

// }