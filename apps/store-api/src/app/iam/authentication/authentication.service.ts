import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../../users/user.service';
import { User } from '../../users/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { InvalidatedRefreshTokenError, RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { SignInDto } from './dto/sign-in.dto';
import { randomUUID } from 'crypto';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly userService: UserService,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    ) {}

    async signup(signUpDto: SignUpDto) {
        try {
            const user = new User();
            user.username = signUpDto.email;
            user.password = await this.hashingService.hash(signUpDto.password);
            await this.userService.save(user);
        } catch (err) {
            const pgUniqueViolationErrorCode = '23505';
            if(err.code === pgUniqueViolationErrorCode) {
                throw new ConflictException();
            }
            throw err;
        }
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.userService.findOne({where: {username: signInDto.email}});
        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }
        const isEqual = await this.hashingService.compare(signInDto.password, user.username);
        if (!isEqual) {
            throw new UnauthorizedException('Invalid Password');
        }
        await this.generateTokens(user);
    }

    async generateTokens(user: User) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                { email: user.username, role: user.role }
            ),
            this.signToken(
                user.id,
                this.jwtConfiguration.refreshTokenTtl,
                {
                    refreshTokenId
                }
            )
        ]);
        this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub, refreshToken } = await this.jwtService.verifyAsync<
            Pick<ActiveUserData, 'sub'> & { refreshToken: string }>(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            });
            const user = await this.userService.findOneByOrFail({
                id: sub,
            }) as unknown as User;
            console.log('user from the refreshTokens method: ', user);
            const isValid = await this.refreshTokenIdsStorage.validate(
                user.id, 
                refreshToken
            );
            if(isValid) {
                this.refreshTokenIdsStorage.invalidate(user.id);
            } else {
                throw new Error('Refresh token is invalid');
            }
            return this.generateTokens(user);
        } catch (err) {
            if(err instanceof InvalidatedRefreshTokenError) {
                throw new UnauthorizedException('Access Denied!')
            }
            throw new UnauthorizedException();
        }
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T): Promise<string> {
        return this.jwtService.signAsync(
            {
                sub: userId,
                ...payload
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        );
    }
}
