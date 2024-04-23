/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from "bcryptjs";
import { MailerService } from "@nestjs-modules/mailer";
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async signUp(payload: SignupDto) {
    try {
      const {password, ...data} = payload;

      const hashed = await bcrypt.hash(payload.password, 12);

      await this.userService.save({
          ...data,
          password: hashed,
      });
  } catch(err) {
    const pgUniqueViolationErrorCode = '23505';
    if (err.code === pgUniqueViolationErrorCode) {
      throw new ConflictException();
    }
    throw err;
  }
 

  return {
      message: 'User Saved Successfully!',
  }    
  }

  async signIn(email, password) {

    const user = await this.userService.findOne({where: {email}}) as User;

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if(!await bcrypt.compare(password, user.password)) {
        throw new BadRequestException("Invalid Credentials");
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  async validateUser(email: string, pass: string): Promise<unknown> {

    const user = await this.userService.findOne({where: {email}}) as User;
    const comparedPass = bcrypt.compare(user.password, pass);
    if (user && comparedPass) {
      const {password, ...result} = user;
      return result;
    } 
    return null;
  }

  async login(user: User) {

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };

  }

}