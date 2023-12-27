import { Inject, Injectable } from '@nestjs/common';
import { User } from "./user.entity";
import { RepositoryService } from '../shared/repository.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends RepositoryService {
    constructor(
        @Inject("USER_REPOSITORY") private userRepository: Repository<User>
    ){
        super(userRepository);
    }
}
