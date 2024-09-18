import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { find } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReportsService {
    constructor(
        private readonly authService: AuthService,
    ) {}
  async generateExcelReport() {


    // Crear una nueva instancia de Workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Usuarios');

    // Definir las columnas del archivo Excel
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Correo Electrónico', key: 'email', width: 30 },
      { header: 'Fecha de Registro', key: 'createdAt', width: 20 },
    ];

    // Agregar datos de ejemplo
    const data = [
      { id: 1, name: name, email: 'juan@example.com', createdAt: '2023-09-01' },
      { id: 2, name: 'Ana García', email: 'ana@example.com', createdAt: '2023-09-02' },
      { id: 3, name: 'Pedro Díaz', email: 'pedro@example.com', createdAt: '2023-09-03' },
    ];

    data.forEach((item) => {
      worksheet.addRow(item);
    });

    return workbook;
  }
}
