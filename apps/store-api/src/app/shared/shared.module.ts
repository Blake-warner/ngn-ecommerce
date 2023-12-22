import { Module } from '@nestjs/common';
//import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379
        })
    ],
    exports: [
        CacheModule
    ]
})
export class SharedModule {}
