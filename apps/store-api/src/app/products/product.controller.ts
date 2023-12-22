import { Controller, Get, Post, Body, Put, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Cache } from "cache-manager";
import * as CONSTANTS from '../shared/constants';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { EventEmitter2 } from "@nestjs/event-emitter";

const rootPath = CONSTANTS.versions; // /v1

@Controller(rootPath)
export class ProductController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private productService: ProductService,
        private eventEmitter: EventEmitter2
        ){}

    @Post('products')
    async create(@Body() createProductDto: CreateProductDto) {
        const products = await this.productService.save(createProductDto);
        this.eventEmitter.emit('products_updated');
        return products;
    }

    @CacheKey('products_frontend')
    @CacheTTL(30 * 60)
    @UseInterceptors(CacheInterceptor)
    @Get('products')
    findAll() {
        const products = this.productService.find();
        return products;
    }

    /*
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
*/
    @Get('product/:id')
    findOne(@Param('id') id: string) {
        const product = this.productService.findOne({where: {id}});
        return product;
    }

    @Put('product/:id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        const product =  this.productService.update(id, updateProductDto);
        this.eventEmitter.emit('products');
        return product;
    }

    @Delete('product/:id')
    remove(@Param('id') id: number) {
        const deletedProduct = this.productService.delete(id);
        this.eventEmitter.emit('products');
        return deletedProduct;
    }
}