// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { ChatResponseDto } from 'src/auth/dto/response.dto';

// @Injectable()
// export class ChatBotService {
//   private readonly apiKey: string;
//   private readonly generationConfig: any;
//   private readonly startChat: any[];

//   constructor(private configService: ConfigService) {
//     // Cambia la forma en que accedes a la configuración
//     const config = this.configService.get<any>('');

//     this.apiKey = this.configService.get<string>('API_KEY');
//     this.generationConfig = config.generationConfig;
//     this.startChat = config.startChat;

    
//     if (!this.apiKey) {
//       throw new Error('API Key no configurada correctamente.');
//     }
//     if (!this.generationConfig) {
//       throw new Error('Configuración de generación no encontrada.');
//     }
//     if (!this.startChat) {
//       throw new Error('Historial de inicio de chat no encontrado.');
//     }
  
//   }

//   async getChatResponse(history: { role: string; parts: string }[], question: string): Promise<ChatResponseDto> {

//   try {
//     console.log("API Key:", this.apiKey);
//     console.log("Generation Config:", this.generationConfig);
//     console.log("Start Chat:", this.startChat);
//     console.log("History:", history);
//     console.log("Question:", question);


//     const genAI = new GoogleGenerativeAI(this.apiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     console.log("Model:", model);

//     const historyChat = this.startChat.concat(history);
//     console.log("Combined History:", historyChat);

//     const chat = model.startChat({
//       history: historyChat,
//       generationConfig: this.generationConfig,
//     });
//     console.log("Chat Instance:", chat);

//     const sendQuestion = await chat.sendMessage(question);
//     console.log("Send Question Response:", sendQuestion);

//     const response = await sendQuestion.response;
//     console.log("Response Object:", response);

//     const text = await response.text();
//     console.log("Response Text:", text);

//     history.push({ role: 'user', parts: question });
//     history.push({ role: 'model', parts: text });

//     return { 
//       history: history.map(item => item.parts),
//       response: text,
//      };

//   } catch (error) {
//     console.error('Error communicating with Generative AI API:', error);
//     throw new Error('Error al obtener respuesta del chatbot');
//   }
//   }
// }
