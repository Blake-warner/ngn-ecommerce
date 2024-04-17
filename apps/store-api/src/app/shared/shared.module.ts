import { Module } from '@nestjs/common';
//import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
//import { JwtModule } from "@nestjs/jwt";
//import { jwtConstants } from './constants';


@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379
        }),
       /* JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s'}
        }), */
    ],
    exports: [
        CacheModule
    ]
})
export class SharedModule {}
