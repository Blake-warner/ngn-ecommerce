import { Controller, Get, Body, Put, Param, Delete, Inject, UseInterceptors, HttpStatus, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Cache } from "cache-manager";
import * as CONSTANTS from '../shared/constants';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { EventEmitter2 } from "@nestjs/event-emitter";

const rootPath = CONSTANTS.versions; // /v1

@Controller(rootPath)
export class ProductController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private userService: UserService,
        private eventEmitter: EventEmitter2
        ){}

    @HttpCode(HttpStatus.OK)
    @CacheKey('users_frontend')
    @CacheTTL(30 * 60)
    @UseInterceptors(CacheInterceptor)
    @Get('users')
    findAll() {
        const users = this.userService.find();
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
        this.eventEmitter.emit('products');
        return product;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('user/:id')
    remove(@Param('id') id: number) {
        const deletedUser = this.userService.delete(id);
        this.eventEmitter.emit('users');
        return deletedUser;
    }
}