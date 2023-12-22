import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class CategoryListener {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    @OnEvent('categories')
    async updateCategoryCacheHandler() {
        await this.cacheManager.del('attributes');
    }
}