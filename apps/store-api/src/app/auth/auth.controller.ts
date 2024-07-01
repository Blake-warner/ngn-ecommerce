import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import * as CONSTANTS from "../shared/constants";
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { EmailDto } from './dtos/email.dto';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { MailService } from '../mailer/mailer.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
//import { User } from '../users/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { User } from '../users/user.entity';
import { Response } from 'express';

const rootPath = CONSTANTS.versions; // /v1

@Auth(AuthType.None)
@Controller(rootPath)
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private verifyEmailService: VerifyEmailService,
        private readonly mailService: MailService,
        private configService: ConfigService,
        private jwtService: JwtService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('auth/signin')
    async signin(@Body() body: SigninDto, @Res({passthrough: true}) response: Response) {
        const signInResponse = await this.authService.signIn(body.email, body.password);
        response.cookie('jwt', signInResponse, {httpOnly: true});
        console.log(response.cookie);
        console.log(signInResponse);
        return signInResponse;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/signup')
    async signup(@Body() body: SignupDto): Promise<unknown> {
        const signUpResponse = this.authService.signUp(body);
        return signUpResponse;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/verify-email')
    async createEmailVerifyCode(@Body() body: EmailDto) {
        console.log('verify email');
        // check if email is duplicated
        const userWithEmail = await this.userService.findOne({where: {email: body.email}}) as User;
        if(userWithEmail) {
            throw new UnauthorizedException('Email is already being used by a registered user');
        }

        const verificationCode = Math.floor(Math.random() * 90000) + 10000; // Generate email validation code
        const payload = { email: body.email, code: verificationCode };

        // html for email 
        let html = '<h3>Please copy and paste the validation code below</h3>';
        html += '<p><b>Validation Code: </b>' + verificationCode + '</p>';
        html += 'once the code is pasted to your clipboard, navigate back to <a href="http://localhost:8000/">Click Here</a> to submit validation code.';

        // Send the email
        this.mailService.sendMail({
            to: body.email,
            from: this.configService.get<string>('MAIL_USER'), // Email is set as environment variable
            subject: 'Verify your email',
            html: html,
        });

        // Save the email and verification code
        const verifyEmail = await this.verifyEmailService.save(payload);
        console.log(verifyEmail);
        return verifyEmail;

    }

    @Get('auth/email-verified')
    async GetverifyEmailCode(@Query() params: {email, code}) {
        console.log('email verified get request');
        const email = params.email;
        const code = params.code;
        const emailToVerify = await this.verifyEmailService.findOne({where: {email, code}});

        if(!emailToVerify) {
            throw new BadRequestException("email and code combination not found. Please submit a valid code");
        }

        return emailToVerify;

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

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }

}
