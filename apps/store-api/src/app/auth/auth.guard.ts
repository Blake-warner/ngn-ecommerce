import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from '../shared/constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if(!token) {
      throw new UnauthorizedException();
    }
    try {
        const payload = this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret
        })
        request['user'] = payload;
    } catch {
        throw new UnauthorizedException();
    }
    return true;
  }

  extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}