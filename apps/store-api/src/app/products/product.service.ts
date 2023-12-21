import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class ProductService extends RepositoryService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>
  ) {
    super(productRepository);
  }
}