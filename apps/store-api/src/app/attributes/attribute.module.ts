import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { attributeProviders } from './attribute.providers';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [AttributeController],
  providers: [
    ...attributeProviders,
    AttributeService,
  ],
})
export class AttributeModule {}