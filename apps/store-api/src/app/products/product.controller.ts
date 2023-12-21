import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import * as CONSTANTS from '../shared/constants';

const rootPath = CONSTANTS.versions+'/products/'; // '/v1/products

@Controller(rootPath)
export class ProductController {
    constructor(private productService: ProductService){}

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.save(createProductDto);
    }

    @Get('/')
    findAll() {
        const products = this.productService.find();
        return products;
        //return this.productService.find();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne({id});
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}