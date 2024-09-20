import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity'; 
import { Task } from 'src/task/entities/task.entity';
import { Novelty } from 'src/novelty/entities/novelty.entity';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: number;

  @Column({ unique: true, nullable: false })
  correo: string;

  @Column()
  telefono: string;

  @Column({ nullable: false })
  contraseña: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Profile, profile => profile.user )
  profile: Profile[];

  
  @ManyToMany(() => Task, (task) => task.users)
  @JoinTable({
    name: "user_task",
    joinColumn:{
      name: "user_id",
    //   referencedColumnName: "id_usuario",
    //  foreignKeyConstraintName: "user_task_user_id"
      },
      inverseJoinColumn:{
        name:"task_id",
        // referencedColumnName: "id_task",
        // foreignKeyConstraintName: "user_task_task_id"
      }
  })
    task: Task[];

  @OneToMany(() => Novelty, novetly => novetly.user)
  novelty: Novelty;
}
