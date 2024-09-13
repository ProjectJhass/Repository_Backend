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

  @Post()
  createt(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }


  @Get(':id_company')
  findOne(@Param('id_company') id_company: string) {
    return this.companiesService.findOne(+id_company);
  }


  @Get(':email')
  findOneByEmail(@Param('email') email: string){
    return this.companiesService.findOneByEmail(email)
  }


  @Patch(':id_company')
  update(@Param('id_company') id_company: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id_company, updateCompanyDto);
  }
  
  @Delete(':id_company')
  remove(@Param('id_company') id_company: string) {
    return this.companiesService.remove(+id_company);
  }
}
