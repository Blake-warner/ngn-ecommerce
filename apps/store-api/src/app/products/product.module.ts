import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, SharedModule, AuthModule],
  controllers: [ProductController],
  providers: [
    ...productProviders,
    ProductService,
  ],
})
export class ProductModule {}