import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity'

@Injectable()


export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id_company: number) {
    return this.companyRepository.findOneBy({ id_company });
  }

  findOneByEmail(email: string){
    return this.companyRepository.findOneBy({ email})
  }

  update(id_company: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update ( {id_company}, updateCompanyDto);
  }

  remove(id_company: number) {
    return this.companyRepository.softDelete({ id_company });
  }
}
