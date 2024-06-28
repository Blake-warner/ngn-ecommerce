import { Controller, Get, Body, Put, Param, Delete, Inject, HttpStatus, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Cache } from "cache-manager";
import * as CONSTANTS from '../shared/constants';
import { CACHE_MANAGER} from '@nestjs/cache-manager';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user.interface';

const rootPath = CONSTANTS.versions; // /v1
@Auth(AuthType.Bearer)
@Controller(rootPath)
export class UserController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private userService: UserService,
        private eventEmitter: EventEmitter2
        ){}

    @Get('users')
    findAll() {
        const users = this.userService.find();
        return users;
    }

    @Get('validate-user')
    validateUser<T>(@ActiveUser() activeUser: ActiveUserData, @Body() body: T) {
        console.log('validated user: ', activeUser);
        console.log(body);
        return activeUser;
    }

    @HttpCode(HttpStatus.OK)
    @Get('user/:id')
    findOne(@Param('id') id: string) {
        const user = this.userService.findOne({where: {id}});
        return user;
    }

    @HttpCode(HttpStatus.OK)
    @Put('user/:id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        const user =  this.userService.update(id, updateUserDto);
        return user;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('user/:id')
    remove(@Param('id') id: number) {
        const deletedUser = this.userService.delete(id);
        console.log("delete users: ", deletedUser);
        return deletedUser;
    }
}