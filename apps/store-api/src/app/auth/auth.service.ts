/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from "bcryptjs";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService{
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async signIn(username, password) {

    const user = await this.userService.findOne({where: {username}}) as User;

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if(!await bcrypt.compare(password, user.password)) {
        throw new BadRequestException("Invalid Credentials");
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  async validateUser(username: string, pass: string): Promise<unknown> {

    const user = await this.userService.findOne({where: {username}}) as User;
    const comparedPass = bcrypt.compare(user.password, pass);
    if (user && comparedPass) {
      const {password, ...result} = user;
      return result;
    } 
    return null;
  }

  async login(user: User) {

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };

  }

}