import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
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
}