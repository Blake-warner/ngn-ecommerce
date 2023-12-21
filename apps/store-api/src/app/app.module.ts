import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';
import { AttributeModule } from './attributes/attribute.module';

@Module({
  imports: [ProductModule, CategoryModule, AttributeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
