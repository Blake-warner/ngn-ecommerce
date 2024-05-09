import { DataSource } from 'typeorm';
import { Category } from './category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CATEGORY_TREE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getTreeRepository(Category),
    inject: ['DATA_SOURCE'],
  }
];