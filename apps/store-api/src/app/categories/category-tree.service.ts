import { Injectable, Inject } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryTreeService  {
  constructor(
    @Inject('CATEGORY_TREE_REPOSITORY')
    private categoryTreeRepository: TreeRepository<Category>
  ) {}

  async getTree() {
    return this.categoryTreeRepository.findTrees();
  }

}