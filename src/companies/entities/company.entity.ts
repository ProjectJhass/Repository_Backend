import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  import { User } from 'src/users/entities/user.entity'; 
import { Profile } from 'src/profile/entities/profile.entity';



@Entity('company')
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    description: string;

    @Column()
    sector: string;

    @Column()
    address: string;

    @Column({ nullable: false, default: 'micro' })
    type: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Profile, profile => profile.company )
    profile: Profile[];


}
