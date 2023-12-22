import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class AttributeListener {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    @OnEvent('attributes')
    async updateAttributeCacheHandler() {
        await this.cacheManager.del('attributes');
    }
}