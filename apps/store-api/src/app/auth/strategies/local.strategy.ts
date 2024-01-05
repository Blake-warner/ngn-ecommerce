import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(username: string, password: string) {
        console.log('incoming username and password: ', username, password);
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new UnauthorizedException('this is the exception');
        }
        return user;
    }

}