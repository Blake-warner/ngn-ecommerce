import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async insert(userId: number, tokenId: string): Promise<void> {
        await this.cacheManager.set(this.getKey(userId), tokenId);
    }

    async validate(userId: number, tokenId: string): Promise<boolean> {
        const storedId = await this.cacheManager.get(this.getKey(userId));
        if(!storedId) {
            throw new InvalidatedRefreshTokenError();
        }
        return storedId === tokenId;
    }

    private getKey(userId: number): string {
        return `user-${userId}`;
    }

    async invalidate(userId: number): Promise<void> {
        await this.cacheManager.del(this.getKey(userId));
    }

}