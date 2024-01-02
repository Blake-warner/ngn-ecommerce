import { Inject, Injectable } from '@nestjs/common';
import { RepositoryService } from '../../shared/repository.service';
import { VerifyEmail } from './verify-email.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyEmailService extends RepositoryService {
    constructor( @Inject('VERIFY-EMAIL_REPOSITORY') private verifyEmailRepository: Repository<VerifyEmail>) {
        super(verifyEmailRepository)
    }
}
