import { HashingService } from "./hashing.service";
import { genSalt, compare, hash } from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService implements HashingService {
    async hash(data: string | Buffer): Promise<string> {
        const salt = await genSalt();
        return hash(data, salt);
    }
    compare(_data: string | Buffer, _encrypted: string): Promise<boolean> {
        return compare(_data, _encrypted);
    }
}
