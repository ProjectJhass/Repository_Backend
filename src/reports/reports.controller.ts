import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './reports.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('all-users-report')
  async getAllUsersReport(@Res() res: Response) {
    // Llama al servicio para generar el reporte de todos los usuarios
    const pdfBuffer = await this.pdfService.generateAllUsersReport();

    // Configura la respuesta HTTP
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="all-users-report.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    // Envía el PDF como respuesta
    res.send(pdfBuffer);
  }
}
