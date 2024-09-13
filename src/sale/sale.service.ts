import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>
  ){}
  
  create(createSaleDto: CreateSaleDto) {
    return this.saleRepository.save(createSaleDto);
  }

  findAll() {
    return this.saleRepository.find();
  }

  findOne(id_sale: number) {
    return this.saleRepository.findOneBy({id_sale});
  }

  update(id_sale: number, updateSaleDto: UpdateSaleDto) {
    return this.saleRepository.update({id_sale}, updateSaleDto);
  }

  remove(id_sale: number) {
    return this.saleRepository.softRemove({id_sale});
  }
}
