/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from "bcryptjs";
import { MailerService } from "@nestjs-modules/mailer";
import { SignupDto } from './dtos/signup.dto';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ActiveUserData } from './interfaces/active-user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  async signUp(payload: SignupDto) {
    console.log('payload from signup: ', payload);
    try {
      const {password, ...data} = payload;
      const hashed = await this.hashingService.hash(password);
      console.log({...data, password: hashed});
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

    if(!await this.hashingService.compare(password, user.password)) {
        throw new BadRequestException("Invalid Credentials");
    }

    return this.generateTokens(user);
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

    return this.generateTokens(user)

  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try { 
      const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        }
      );
      const user = await this.userService.findOneByOrFail(sub) as User;
      return this.generateTokens(user);
    } catch(err) {
      throw new UnauthorizedException();
    }
  }

  private async signToken<T extends object>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn
      },
    );
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email, role: user.role }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return {
      user,
      accessToken,
      refreshToken,
    }
  }


}