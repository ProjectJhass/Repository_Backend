import { User } from './../../users/entities/user.entity';
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

@Entity('novetly')  
export class Novelty {

    @PrimaryGeneratedColumn()
    id_novetly: number;

    @Column()
    description: string;

    @Column()
    detection_date: Date;

    @Column()
    state: string;

    // @OneToMany(() => Sale, sale => sale.product)
    // sale: Sale;

    @ManyToOne(() => User, user => user.novelty)
    user: User;

}
