import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  private static readonly authGuardDefault = AuthType.None;
  authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()] 
    ) ?? [ AuthGuard.authGuardDefault];
    let error = new UnauthorizedException();
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    for(const guard of guards) {
      const guardResult = Promise.resolve(guard.canActivate(context))
        .catch((err) => {
          error = err;
        });
      if(guardResult) {
        return true;
      }
    }
    throw error;
  }

}