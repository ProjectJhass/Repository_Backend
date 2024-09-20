// // import { ConfigService } from '@nestjs/config';

// export const getChatbotConfig = () => ({
//   apiKey: process.env.API_KEY,
//   generationConfig: {
//     stopSequences: ["red"],
//     maxOutputTokens: 400,
//     temperature: 0.5,
//     topP: 0.1,
//     topK: 16,
//   },
//   startChat: [
//     {
//       role: "user",
//       parts: `Nombre de la Empresa: jhass
  
//       Misión: Nuestra misión en jhass es optimizar la administración empresarial al proporcionar un sistema innovador...
//       `,
//     },
//     {
//       role: "user",
//       parts: "Jhass",
//     }
//   ],
//   // apiKey: process.env.API_KEY || '', // Usar 'apiKey' en lugar de 'KEY_GEMINI'
//   // generationConfig: JSON.parse(process.env.GENERATIONCONGIF || '{}'),
//   // startChat: JSON.parse(process.env.STARTCHAT || '[]'),
// });
