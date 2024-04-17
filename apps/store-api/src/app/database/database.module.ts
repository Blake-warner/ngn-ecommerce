import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import db from './config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(db)],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}