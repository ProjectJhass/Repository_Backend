import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';

{User}

@Entity('task')  
export class Task {
  @PrimaryGeneratedColumn()
  id_task: number;

  @Column()
  title_task: string;


  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  time_end: string;

  @Column()
  time_start: string;


  @ManyToMany(() => User, (user) => user.task)
  users: User[];

}
