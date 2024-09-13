import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity'; 
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard'; 
import { Roles } from './roles.decorator';

// export function Auth(role: Role) {
//   return applyDecorators(Roles(rank), UseGuards(AuthGuard, RolesGuard));
// }