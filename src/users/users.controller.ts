import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PdfService } from 'src/reports/reports.service';
import { Response } from 'express';


@ApiTags('user')
@ApiBearerAuth()
@Controller('usuario')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly pdfReportService: PdfService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Ruta específica para buscar por correo
  @Get(':correo')
  findOneByCorreo(@Param('correo') correo: string) {
    return this.usersService.findOneByEmail(correo);
  }

  // Ruta específica para buscar por ID de usuario
  @Get(':id_usuario')
  findOne(@Param('id_usuario') id_usuario: number) {
    return this.usersService.findOne(id_usuario);
  }

  // @Get(':id_usuario/report')
  // @ApiOperation({ summary: 'Generar un reporte PDF del usuario' }) // Esto describe la operación en Swagger
  // @ApiResponse({
  //   status: 200,
  //   description: 'El reporte PDF ha sido generado.',
  //   content: {
  //     'application/pdf': {
  //       schema: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // async getUserReport(@Param('id_usuario') id_usuario: number, @Res() res: Response) {
  //   const user = await this.usersService.findById(id_usuario);
      
  //   if (!user) {
  //     return res.status(404).json({ message: 'Usuario no encontrado' });
  //   }

  //   const pdfBuffer = this.pdfReportService.generateUserReport(user);

  //   // Configura la respuesta para enviar un archivo PDF
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': `attachment; filename="reporte_usuario_${user.id_usuario}.pdf"`,
  //     'Content-Length': pdfBuffer.length,
  //   });

  //   res.send(pdfBuffer);
  // }

  @Patch(':id_usuario')
  update(@Param('id_usuario') id_usuario: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id_usuario, updateUserDto);
  }

  @Delete(':id_usuario')
  remove(@Param('id_usuario') id_usuario: number) {
    return this.usersService.remove(+id_usuario);
  }

  // Ruta específica para restaurar usuarios por ID
  @Patch('restore/:id_usuario')
  restoreUserById(@Param('id_usuario') id_usuario: number) {
    return this.usersService.restoreUserById(+id_usuario);
  }
}
