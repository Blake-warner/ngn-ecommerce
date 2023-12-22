import { Controller, Get, Post, Body, Put, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Cache } from "cache-manager";
import * as CONSTANTS from '../shared/constants';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

const rootPath = CONSTANTS.versions; // /v1

@Controller(rootPath)
export class ProductController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private productService: ProductService
        ){}

    @Post('products')
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.save(createProductDto);
    }

    @Get('prodfucts')
    findAll() {
        const products = this.productService.find();
        return products;
        //return this.productService.find();
    }

    @CacheKey('products_frontend')
    @CacheTTL(30 * 60)
    @Get('products/frontend')
    @UseInterceptors(CacheInterceptor)
    frontend() {
        return this.productService.find();
    }

    @Get('products/backend')
    backend() {
        return this.productService.find();
    }

    @Get('product/:id')
    findOne(@Param('id') id: string) {
        console.log(id);
        return this.productService.findOne({where: {id}});
    }

    @Put('product/:id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete('product/:id')
    remove(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}