import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  providers: [
    AuthenticationService,
   { 
     provide: HashingService,
     useClass: BcryptService,
   }
  ],
})
export class IamModule {}
