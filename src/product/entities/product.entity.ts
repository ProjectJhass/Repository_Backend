import { Company } from 'src/companies/entities/company.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne, 
    JoinColumn,
    OneToMany
  } from 'typeorm';
// import { Motion } from 'src/motion/entities/motion.entity';
// import { Category } from 'src/category/entities/category.entity';


@Entity('product')  
export class Product {

    @PrimaryGeneratedColumn()
    id_product: number;

    @Column()
    name_product: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column()
    description: string;
    
    @Column({name: 'category_id'})
    categoryId: number;

    @Column({name: 'company_id'})
    companyId: number;

    // @ManyToOne(()=> Category, (category) => category.product)
    // @JoinColumn({name: 'category_id'})
    // category: Category;

    // @ManyToOne(()=> Company, (company) => company.product)
    // @JoinColumn({name: 'company_id'})
    // company: Company;

    // @OneToMany(() => Motion, (motion) => motion.product)
    // @JoinColumn({name: 'motion_id'})
    // motion: Motion[];

    @OneToMany(() => Sale, sale => sale.product)
    sale: Sale;
  }
