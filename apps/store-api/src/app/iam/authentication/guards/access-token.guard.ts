import { JwtService } from "@nestjs/jwt";
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from "@nestjs/config";
import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { REQUEST_USER_KEY } from "../../iam.constants";

export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verifyAsync(
                token,
                this.jwtConfiguration
            );
            request[REQUEST_USER_KEY] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const token = request.headers.authorization.split(' ')[1];
        return token;
    }
}