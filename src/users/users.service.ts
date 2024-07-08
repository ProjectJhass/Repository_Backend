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
    return `This action returns all users`;
  }

  findOne(id_usuario: number) {
    return `This action returns a #${id_usuario} user`;
  }

  update(id_usuario: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id_usuario} user`;
  }

  remove(id_usuario: number) {
    return this.userRepository.remove;
  }
}
