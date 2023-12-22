import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateAttributeDto } from './dtos/create-attribute.dto';
import { UpdateAttributeDto } from './dtos/update-attribute.dto';
import { AttributeService } from './attribute.service';
import * as CONSTANTS from '../shared/constants';

const rootPath = CONSTANTS.versions; // '/v1

@Controller(rootPath)
export class AttributeController {
    constructor(private attributeService: AttributeService){}

    @Post('attributes')
    async create(@Body() CreateAttributeDto: CreateAttributeDto) {
        return await this.attributeService.save(CreateAttributeDto);
    }

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
        return this.attributeService.update(id, updateProductDto);
    }

    @Delete('attribute/:id')
    remove(@Param('id') id: number) {
        return this.attributeService.delete(id);
    }
}