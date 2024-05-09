import { Controller, Get, Post, Body, Put, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryService } from './category.service';
import { Cache } from "cache-manager";
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import * as CONSTANTS from '../shared/constants';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CategoryTreeService } from './category-tree.service';

const rootPath = CONSTANTS.versions; // '/v1

@Controller(rootPath)
export class CategoryController {
    constructor( 
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private categoryService: CategoryService,
        private categoryTreeService: CategoryTreeService,
        private eventEmitter: EventEmitter2
    ){}

    @Post('categories')
    async create(@Body() createCategorytDto: CreateCategoryDto) {
        let category;
        if(createCategorytDto.parent) {
            const parent = await this.categoryService.findOne({where: {id: createCategorytDto.parent}});
            const newCategory = {
                title: createCategorytDto.title,
                parent
            };
            category = await this.categoryService.save(newCategory);
        } else {
            const newCategory = {
                title: createCategorytDto.title
            };
            category = await this.categoryService.save(newCategory);
        }
        this.eventEmitter.emit('categories');
        return category;
    }

    @CacheKey('categories')
    @CacheTTL(30 * 60)
    @UseInterceptors(CacheInterceptor)
    @Get('categories')
    findAll() {
        return this.categoryService.find();
    }

    @Get('category/:id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne({where: {id}});
    }

    @Put('category/:id')
    update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        const updatedCategory = this.categoryService.update(id, updateCategoryDto);
        this.eventEmitter.emit('categories');
        return updatedCategory;
    }

    @Delete('category/:id')
    remove(@Param('id') id: number) {
        const deletedCategory = this.categoryService.delete(id);
        this.eventEmitter.emit('categories');
        return deletedCategory;
    }

    @Get('category-tree')
    async findTree() {
        const catTree = await this.categoryTreeService.getTree();
        return catTree;
    }
}