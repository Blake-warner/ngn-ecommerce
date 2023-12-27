import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { UserModule } from "../users/user.module";

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule, SharedModule, UserModule],
  providers: [AuthService],
})
export class AuthModule {}
