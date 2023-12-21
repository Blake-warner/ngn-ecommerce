import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class CategoryService extends RepositoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>
  ) {
    super(categoryRepository);
  }

}