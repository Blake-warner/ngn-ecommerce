import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Get, Param } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import * as bcrypt from "bcryptjs";
import * as CONSTANTS from "../shared/constants";
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { VerifyEmailService } from './verify-email/verify-email.service';

const rootPath = CONSTANTS.versions; // /v1

@Controller(rootPath)
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private verifyEmailService: VerifyEmailService
        ){}

    @HttpCode(HttpStatus.OK)
    @Post('auth/signin')
    async signin(@Body() body: SigninDto) {
        return this.authService.signIn(body.username, body.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/signup')
    async signup(@Body() body: SigninDto) {
        const {password, ...data} = body;

        if(body.password !== password) {
            throw new BadRequestException(
                "Password does not match incoming password from request body!"
            );
        }

        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.save({
            ...data,
            password: hashed,
        });
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/verify-email')
    async createEmailVerifyCode(@Body() body: VerifyEmailDto) {
        return this.verifyEmailService.save(body);
    }

    @Post('auth/email-verified')
    async verifyEmailCode(@Body() body: VerifyEmailDto) {

        const email = body.email;
        const code = body.code;

        const emailToVerify = await this.verifyEmailService.findOne({where: {email, code}});

        if(!emailToVerify) {
            throw new BadRequestException("email and code combination not found. Please submit a valid code");
        }

        return emailToVerify;

    }

}
