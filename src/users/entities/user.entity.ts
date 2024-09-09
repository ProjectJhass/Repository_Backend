import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity'; 

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

  @Column({ nullable: true }) // Nueva columna para la URL de la foto de perfil
  fotoPerfil: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Profile, profile => profile.user)
  profile: Profile[];
}
