import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    ...productProviders,
    ProductService,
  ],
})
export class ProductModule {}