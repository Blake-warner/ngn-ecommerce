import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryProviders } from './category.provider';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryTreeService } from './category-tree.service';

@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [CategoryController],
  providers: [
    ...categoryProviders,
    CategoryService,
    CategoryTreeService
  ]
})
export class CategoryModule {}
