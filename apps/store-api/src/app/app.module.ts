import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';

import { CategoryModule } from './categories/category.module';
import { AttributeModule } from './attributes/attribute.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mailer/mailer.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AttributeModule,
    SharedModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
