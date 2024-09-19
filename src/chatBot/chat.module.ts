import { Module } from '@nestjs/common';
import { ChatBotController } from './chat.controller';
import { ChatBotService } from './chat.service';
import { ConfigModule } from '@nestjs/config';
import { getChatbotConfig } from 'src/config/chat.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ChatBotController], 
  providers: [ChatBotService], 
})
export class ChatBotModule {}
