import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { verifyEmailProviders } from './verify-email/verify-email.provider';
import { MailService } from '../mailer/mailer.service';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    DatabaseModule, 
    SharedModule, 
    UserModule
  ],
  providers: [
    AuthService, 
    VerifyEmailService, 
    ...verifyEmailProviders,
    ConfigService,
    MailService
  ],
})
export class AuthModule {}
