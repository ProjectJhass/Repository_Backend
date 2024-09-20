import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY_GEMINI, GENERATION_CONFIG, START_CHAT } from './config/config';

@Injectable()
export class ChatService {
  private genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
  private model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

  async sendMessage(history: any[], question: string) {
    let historyChat = START_CHAT.concat(history);

    // return { historyChat }
    // Comprobar si hay una respuesta predefinida para la pregunta
    const predefinedResponse = this.getPredefinedResponse(question);
    if (predefinedResponse) {
      history.push({ role: 'user', parts: question });
      history.push({ role: 'Chat', parts: predefinedResponse });
      return { history };
    }

    // Si no hay respuesta predefinida, envía la pregunta al modelo
    const chat = this.model.startChat({
      history: historyChat[''],
      generationConfig: GENERATION_CONFIG,
    });

    const sendQuestion = await chat.sendMessage(question);
    const response = await sendQuestion.response;
    const text = response.text();
    return { text }
    history.push({ role: 'user', parts: question });
    history.push({ role: 'Chat', parts: text });

    return { history };
  }

  private getPredefinedResponse(question: string): string | null {
    // Iterar sobre las partes de START_CHAT para encontrar una respuesta
    for (const item of START_CHAT) {
      for (const part of item.parts) {
        if (part.toLowerCase().includes(question.toLowerCase())) {
          return part; // Devuelve la parte que coincide con la pregunta
        }
      }
    }
    return null; // Devuelve null si no se encuentra respuesta
  }
}
