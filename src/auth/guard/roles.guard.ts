import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Rank } from '../enums/rol.enum';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService:RolesService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const rank = this.reflector.getAllAndOverride<Rank>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rank) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return rank === user.rank;
  }
}