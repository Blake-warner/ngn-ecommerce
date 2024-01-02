import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcryptjs";
import * as CONSTANTS from "../shared/constants";
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { EmailDto } from './dtos/email.dto';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { MailService } from '../mailer/mailer.service';

const rootPath = CONSTANTS.versions; // /v1

@Controller(rootPath)
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private verifyEmailService: VerifyEmailService,
        private readonly mailService: MailService,
        private configService: ConfigService
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
    async createEmailVerifyCode(@Body() body: EmailDto) {

        const verificationCode = Math.floor(Math.random() * 90000) + 10000; // Generate email validation code
        const payload = { email: body.email, code: verificationCode }; // completed payload to store as new email verifaction record
  

        const verifyEmail = await this.verifyEmailService.save(payload); // create new verify_email table record
        
        let html = '<h3>Please copy and paste the validation code below</h3>';
        html += '<p><b>Validation Code: </b>' + verificationCode + '</p>';
        html += 'once the code is pasted to your clipboard, navigate back to <a href="http://localhost:8000/">Click Here</a> to submit validation code.';

        this.mailService.sendMail({ // send the verifaction email with validation code included
            to: body.email,
            from: this.configService.get<string>('MAIL_USER'),
            subject: 'Verify your email', // Subject line
            html: html, // HTML body content
        })
        return verifyEmail;
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
