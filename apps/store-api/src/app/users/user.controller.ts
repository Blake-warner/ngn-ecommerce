import { Controller, Get, Body, Put, Param, Delete, Inject, HttpStatus, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Cache } from "cache-manager";
import * as CONSTANTS from '../shared/constants';
import { CACHE_MANAGER} from '@nestjs/cache-manager';
import { EventEmitter2 } from "@nestjs/event-emitter";

const rootPath = CONSTANTS.versions; // /v1

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
        console.log("users from findall ", users);
        return users;
    }

    @HttpCode(HttpStatus.OK)
    @Get('user/:id')
    findOne(@Param('id') id: string) {
        const product = this.userService.findOne({where: {id}});
        return product;
    }

    @HttpCode(HttpStatus.OK)
    @Put('user/:id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        const product =  this.userService.update(id, updateUserDto);
        return product;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('user/:id')
    remove(@Param('id') id: number) {
        const deletedUser = this.userService.delete(id);
        console.log("delete users: ", deletedUser);
        return deletedUser;
    }
}