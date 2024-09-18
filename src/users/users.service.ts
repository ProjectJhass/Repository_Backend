import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(correo: string) {
    return this.userRepository.findOneBy({ correo });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id_usuario: number) {
    return this.userRepository.findOneBy({ id_usuario });
  }

  //falta que funcione
  update(id_usuario: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id_usuario}, updateUserDto);
  }

  remove(id_usuario: number) {
    return this.userRepository.softDelete(id_usuario);
  }

   restoreUserById(id_usuario: number){
    return this.userRepository.restore(id_usuario)
   }
   async saveUser(user: User) {
    return this.userRepository.save(user);
  }
  async save(user: User) {
    return this.userRepository.find()
  }
}
