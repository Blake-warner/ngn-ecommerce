import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { RepositoryService } from '../shared/repository.service';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductService extends RepositoryService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {
    super(productRepository);
  }

  async AddCategories(categories: Category[]) {
    return this.categoryRepository.save(categories);
  }
}