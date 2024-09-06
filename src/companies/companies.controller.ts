import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('companies')
@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // Ruta para crear una nueva compañía
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  // Ruta para obtener todas las compañías
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  // Ruta para obtener una compañía por ID
  @Get('id/:id') // Prefijo para distinguir claramente que es un ID
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  // Ruta para obtener una compañía por correo electrónico
  @Get('email/:email') // Prefijo para distinguir que es un correo electrónico
  findOneByEmail(@Param('email') email: string) {
    return this.companiesService.findOneByEmail(email);
  }

  // Ruta para actualizar una compañía por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  // Ruta para eliminar una compañía por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
