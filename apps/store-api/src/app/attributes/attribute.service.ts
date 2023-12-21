import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attribute } from './attribute.entity';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class AttributeService extends RepositoryService {
  constructor(
    @Inject('ATTRIBUTE_REPOSITORY')
    private attributeRepository: Repository<Attribute>
  ) {
    super(attributeRepository);
  }
}