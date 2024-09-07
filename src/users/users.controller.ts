import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Ruta específica para buscar por correo
  @Get('correo/:correo')
  findOneByCorreo(@Param('correo') correo: string) {
    return this.usersService.findOneByEmail(correo);
  }

  // Ruta específica para buscar por ID de usuario
  @Get('id/:id_usuario')
  findOne(@Param('id_usuario') id_usuario: number) {
    return this.usersService.findOne(id_usuario);
  }

  @Patch(':id_usuario')
  update(@Param('id_usuario') id_usuario: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id_usuario, updateUserDto);
  }

  @Delete(':id_usuario')
  remove(@Param('id_usuario') id_usuario: number) {
    return this.usersService.remove(+id_usuario);
  }

  // Ruta específica para restaurar usuarios por ID
  @Patch('restore/:id_usuario')
  restoreUserById(@Param('id_usuario') id_usuario: number) {
    return this.usersService.restoreUserById(+id_usuario);
  }
}
