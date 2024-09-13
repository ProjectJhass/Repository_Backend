import { Company } from 'src/companies/entities/company.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity('role')
export class Role {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    rank: number;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @OneToMany(() => Profile, profile => profile.role )
    profile: Profile[];
  
    @Column({ name: 'id_company' })
      companyId:number;
  
     @ManyToOne(() => Company, company => company.role )
     @JoinColumn({ name: 'id_company'})
     company: Company;
    
  
}
