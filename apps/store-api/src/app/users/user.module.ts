import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [UserService, ...userProviders],
  exports: [UserService]
})
export class UserModule {}
