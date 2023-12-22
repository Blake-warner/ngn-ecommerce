import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';
import { AttributeModule } from './attributes/attribute.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ProductModule, 
    CategoryModule, 
    AttributeModule, 
    SharedModule, 
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
