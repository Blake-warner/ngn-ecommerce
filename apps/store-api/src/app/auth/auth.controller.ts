import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import * as bcrypt from "bcryptjs";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService
        ){}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() body: SigninDto) {
        return this.authService.signIn(body.username, body.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signup(@Body() body: SigninDto) {
        const {password, ...data} = body;

        if(body.password !== password) {
            throw new BadRequestException("Password does not match incoming password from request body!");
        }

        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.save({
            ...data,
            password: hashed,
        });
    }
}
