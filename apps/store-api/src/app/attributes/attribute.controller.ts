import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateAttributeDto } from './dtos/create-attribute.dto';
import { UpdateAttributeDto } from './dtos/update-attribute.dto';
import { AttributeService } from './attribute.service';
import * as CONSTANTS from '../shared/constants';

const rootPath = CONSTANTS.versions+'/attributes/'; // '/v1/attributes

@Controller(rootPath)
export class AttributeController {
    constructor(private attributeService: AttributeService){}

    @Post()
    async create(@Body() CreateAttributeDto: CreateAttributeDto) {
        return await this.attributeService.save(CreateAttributeDto);
    }

    @Get('/')
    findAll() {
        return this.attributeService.find();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attributeService.findOne({id});
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateAttributeDto) {
        return this.attributeService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.attributeService.delete(id);
    }
}