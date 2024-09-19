// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from '../auth/dto/send-email.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@ApiBearerAuth()
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    try {
      const result = await this.emailService.sendWelcomeEmail(
        sendEmailDto.to,
        sendEmailDto.subject,
        sendEmailDto.dataTemplate,
        sendEmailDto.templateContent
      );
      return result;
    } catch (error) {
      return { message: `Error: ${error.message}` };
    }
  }
}
