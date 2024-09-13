import { Product } from 'src/product/entities/product.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('sale')
export class Sale {
    @PrimaryGeneratedColumn()
    id_sale: number;

    @Column()
    amount: number;

    @Column()
    total_price: number;
    
    @ManyToOne(() => Product, product => product.sale)
    @JoinColumn({name: 'id_sale_day'})
    product: Product; 
}
