import { Controller, Get, Post, Body, Put, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryService } from './category.service';
import { Cache } from "cache-manager";
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import * as CONSTANTS from '../shared/constants';

const rootPath = CONSTANTS.versions; // '/v1

@Controller(rootPath)
export class CategoryController {
    constructor( @Inject(CACHE_MANAGER) private cacheManager: Cache,private categoryService: CategoryService){}

    @Post('categories')
    async create(@Body() createCategorytDto: CreateCategoryDto) {
        return await this.categoryService.save(createCategorytDto);
    }

    @Get('categories')
    findAll() {
        return this.categoryService.find();
    }

    @CacheKey('categories_frontend')
    @CacheTTL(30 * 60)
    @Get('frontend')
    @UseInterceptors(CacheInterceptor)
    frontend() {
        return this.categoryService.find();
    }

    @Get('category/:id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne({where: {id}});
    }

    @Put('category/:id')
    update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete('category/:id')
    remove(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }
}