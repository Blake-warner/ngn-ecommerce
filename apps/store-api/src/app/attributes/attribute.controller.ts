import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CreateAttributeDto } from './dtos/create-attribute.dto';
import { UpdateAttributeDto } from './dtos/update-attribute.dto';
import { AttributeService } from './attribute.service';
import * as CONSTANTS from '../shared/constants';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

const rootPath = CONSTANTS.versions; // '/v1

@Controller(rootPath)
export class AttributeController {

    constructor(
        private attributeService: AttributeService,
        private eventEmitter: EventEmitter2
    ){}

    @Post('attributes')
    async create(@Body() CreateAttributeDto: CreateAttributeDto) {
        const attributes = await this.attributeService.save(CreateAttributeDto);
        this.eventEmitter.emit('attributes');
        return attributes;
    }

    @CacheKey('attributes')
    @CacheTTL(30 * 60)
    @UseInterceptors(CacheInterceptor)
    @Get('/attributes')
    findAll() {
        return this.attributeService.find();
    }

    @Get('attribute/:id')
    findOne(@Param('id') id: string) {
        return this.attributeService.findOne({id});
    }

    @Put('attribute/:id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateAttributeDto) {
        const updatedAttribute = this.attributeService.update(id, updateProductDto);
        this.eventEmitter.emit('attributes');
        return updatedAttribute;
    }

    @Delete('attribute/:id')
    remove(@Param('id') id: number) {
        const deletedAttribute = this.attributeService.delete(id);
        this.eventEmitter.emit('attributes');
        return deletedAttribute;
    }
}