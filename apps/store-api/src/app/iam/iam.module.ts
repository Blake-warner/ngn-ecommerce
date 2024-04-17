import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    SharedModule,
  ],
  providers: [
    AuthenticationService,
   { 
     provide: HashingService,
     useClass: BcryptService,
   },
   {
     provide: APP_GUARD,
     useClass: AuthenticationGuard,
   },
   AccessTokenGuard,
   RefreshTokenIdsStorage,
  ],
})
export class IamModule {}
