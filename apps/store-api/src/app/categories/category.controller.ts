import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryService } from './category.service';
import * as CONSTANTS from '../shared/constants';

const rootPath = CONSTANTS.versions+'/categories/'; // '/v1/categories

@Controller(rootPath)
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Post()
    async create(@Body() createCategorytDto: CreateCategoryDto) {
        return await this.categoryService.save(createCategorytDto);
    }

    @Get('/')
    findAll() {
        return this.categoryService.find();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne({id});
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }
}