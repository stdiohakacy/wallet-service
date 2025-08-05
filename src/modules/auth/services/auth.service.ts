import { Injectable } from '@nestjs/common';
import { IAuthService } from 'src/modules/auth/interfaces/auth.service.interface';
import { AuthJwtAccessPayloadDto } from 'src/modules/auth/dtos/jwt/auth.jwt.access-payload.dto';
import { AuthJwtRefreshPayloadDto } from 'src/modules/auth/dtos/jwt/auth.jwt.refresh-payload.dto';
import {
    IAuthPassword,
    IAuthPasswordOptions,
} from 'src/modules/auth/interfaces/auth.interface';
import { AuthSocialApplePayloadDto } from 'src/modules/auth/dtos/social/auth.social.apple-payload.dto';
import { AuthSocialGooglePayloadDto } from 'src/modules/auth/dtos/social/auth.social.google-payload.dto';
import { ENUM_AUTH_LOGIN_FROM } from 'src/modules/auth/enums/auth.enum';
import { AuthLoginResponseDto } from 'src/modules/auth/dtos/response/auth.login.response.dto';

@Injectable()
export class AuthService implements IAuthService {
    createAccessToken(
        subject: string,
        payload: AuthJwtAccessPayloadDto
    ): Promise<string> {
        throw new Error('Method not implemented.');
    }
    validateAccessToken(subject: string, token: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    payloadAccessToken(token: string): Promise<AuthJwtAccessPayloadDto> {
        throw new Error('Method not implemented.');
    }
    createRefreshToken(
        subject: string,
        payload: AuthJwtRefreshPayloadDto
    ): Promise<string> {
        throw new Error('Method not implemented.');
    }
    validateRefreshToken(subject: string, token: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    payloadRefreshToken(token: string): Promise<AuthJwtRefreshPayloadDto> {
        throw new Error('Method not implemented.');
    }
    validateUser(
        passwordString: string,
        passwordHash: string
    ): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    createPayloadAccessToken(
        data: any,
        session: string,
        loginDate: Date,
        loginFrom: ENUM_AUTH_LOGIN_FROM
    ): Promise<AuthJwtAccessPayloadDto> {
        throw new Error('Method not implemented.');
    }
    createPayloadRefreshToken({
        user,
        session,
        loginFrom,
        loginDate,
    }: AuthJwtAccessPayloadDto): Promise<AuthJwtRefreshPayloadDto> {
        throw new Error('Method not implemented.');
    }
    createSalt(length: number): Promise<string> {
        throw new Error('Method not implemented.');
    }
    createPassword(
        password: string,
        options?: IAuthPasswordOptions
    ): Promise<IAuthPassword> {
        throw new Error('Method not implemented.');
    }
    createPasswordRandom(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    checkPasswordExpired(passwordExpired: Date): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    createToken(user: any, session: string): Promise<AuthLoginResponseDto> {
        throw new Error('Method not implemented.');
    }
    getPasswordAttempt(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getPasswordMaxAttempt(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    appleGetTokenInfo(code: string): Promise<AuthSocialApplePayloadDto> {
        throw new Error('Method not implemented.');
    }
    googleGetTokenInfo(
        accessToken: string
    ): Promise<AuthSocialGooglePayloadDto> {
        throw new Error('Method not implemented.');
    }
}
