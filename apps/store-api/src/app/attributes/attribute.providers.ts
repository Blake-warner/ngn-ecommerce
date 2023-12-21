import { DataSource } from 'typeorm';
import { Attribute } from './attribute.entity';

export const attributeProviders = [
  {
    provide: 'ATTRIBUTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Attribute),
    inject: ['DATA_SOURCE'],
  },
];