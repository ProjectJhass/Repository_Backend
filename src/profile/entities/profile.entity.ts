import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';

  @Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id_profile: number;

  @Column({ name: 'id'})
  roleId: number;

  @ManyToOne(() => Role, role => role.profile )
  @JoinColumn({ name: 'id'})
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ name: 'id_usuario' })
  userId:number;

  @ManyToOne(() => User, user => user.profile)
  @JoinColumn({ name: 'id_usuario'})
  user: User;

  @Column({ name: 'id_company' })
  companyId:number;

  @ManyToOne(() => Company, company => company.profile )
  @JoinColumn({ name: 'id_company'})
  company: Company;
}
