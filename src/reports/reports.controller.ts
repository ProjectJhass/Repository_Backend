import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('excel')
  async generateExcelReport(@Res() res: Response) {
    // Obtener el workbook desde el servicio
    const workbook = await this.reportsService.generateExcelReport();

    // Definir nombre del archivo
    const filename = 'reporte-usuarios.xlsx';

    // Configurar cabeceras HTTP
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`,
    );

    // Enviar el archivo Excel al cliente
    await workbook.xlsx.write(res);
    res.end();
  }
}
