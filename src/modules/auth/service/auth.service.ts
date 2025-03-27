import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import ms from 'ms';
import type { IResult } from 'ua-parser-js';

import { CUSTOMER_ID } from '../constants';
import type {
  ForgetPasswordDto,
  LoginDto,
  LoginWithPasswordDto,
  VerifyDto,
  VerifyForgetPasswordDto,
} from '../dto';
import type { JwtToken } from '../interface';
import { SessionService } from './session.service';
import { RedisService } from '@Common/modules/redis';
import { BlacklistedService } from '@Common/modules/blacklisted';
import { UserService } from '@Modules/user/user.service';
import { User } from '@Modules/user/entity/user.entity';
import { Session } from '../entity/session.schema';
import { Roles } from '@Common/constants';
import { MD5, Time } from '@Common/helpers';
import { OtpService } from './otp.service';
import { ConfigService } from '@nestjs/config';
import { ConfigNamespace } from '@Common/configuration/config.constant';
import { TokenOptions } from '@Common/interfaces';




@Injectable()
export class AuthService {
  private readonly accessTokenOptions: TokenOptions;
  private readonly refreshTokenOptions: TokenOptions;
  constructor(
    private readonly blacklistedService: BlacklistedService,
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const { accessToken, refreshToken } = this.configService.get(
      ConfigNamespace.Auth,
    );

    this.accessTokenOptions = accessToken;
    this.refreshTokenOptions = refreshToken;
  }

  // async loginWithPassword(
  //   dto: LoginWithPasswordDto,
  //   options: { ip?: string; agents: IResult },
  // ) {
  //   const { phone, password } = dto;

  //   const user = await this.userService.findUserByPhone(phone);

  //   if (!user) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

  //   if (user.password == null)
  //     throw new BadRequestException('AUTH.PASSWORD_NOT_SPECIFIED');

  //   const isPasswordMatched = await Bcrypt.compare(password, user.password);

  //   if (!isPasswordMatched)
  //     throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

  //   if (!user.isConfirmed)
  //     throw new UnauthorizedException('AUTH.USER_IS_INACTIVE');

  //   return this.generateUserResponse(user, options);
  // }

  // async forgetPassword(dto: ForgetPasswordDto) {
  //   const { phone } = dto;

  //   const user = await this.userService.findOne({
  //     query: { phone },
  //   });

  //   if (!user) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

  //   if (!user.isConfirmed)
  //     throw new UnauthorizedException('AUTH.USER_IS_INACTIVE');

  //   const token = await this.otpService.createOtpToken(phone);

  //   await this.otpService.sendCode(phone, token, {
  //     ttl: TTL,
  //     // TODO: This must be changed to template of ForgetPassword in Fucking Meli Payamak
  //     template: OTP_OPTIONS().template,
  //   });

  //   return true;
  // }

  // async verifyForgetPassword(
  //   dto: VerifyForgetPasswordDto,
  //   options: { ip?: string; agents: IResult },
  // ) {
  //   const { phone, token, password } = dto;

  //   const isTokenMatched = await this.otpService.verifyOtp(phone, token);

  //   if (!isTokenMatched) throw new BadRequestException('AUTH.TOKEN_INVALID');

  //   const user = await this.userService.findOne({
  //     query: { phone },
  //   });

  //   if (!user) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

  //   if (!user.isConfirmed)
  //     throw new UnauthorizedException('AUTH.USER_IS_INACTIVE');

  //   const hashedPassword = await Bcrypt.hash(password);

  //   user.password = hashedPassword;

  //   await this.userService.updateById(
  //     { query: { id: user.id } },
  //     {
  //       password: hashedPassword,
  //       createdBy: user.createdBy,
  //       createdAt: user.createdAt,
  //     },
  //   );

  //   return this.generateUserResponse(user, { ...options });
  // }

  async login(loginDto: LoginDto) {
    const { phone } = loginDto;

    await this.otpService.send(phone);

    return true;
  }

  async verify(
    verifyDto: VerifyDto,
    options: { ip?: string; agents: IResult },
  ) {
    const { phone, token } = verifyDto;
    const isTokenMatched = await this.otpService.validate(phone, token);

    if (!isTokenMatched) throw new BadRequestException('AUTH.TOKEN_INVALID');

    const user = await this.findOrCreateUser(verifyDto.phone);
    return this.generateUserResponse(user, { ...options });
  }

  async logout(refreshToken: JwtToken): Promise<boolean> {
    try {
      await this.blacklistedService.put(
        refreshToken.session,
        Time.remainedTime(refreshToken.exp!),
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async refreshToken(refreshToken: JwtToken) {
    const session = await this.sessionService.findSessionById(refreshToken.session);

    if (!session) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

    const user = await this.userService.findUserById(refreshToken.sub);

    if (!user) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

    return this.generateUserResponse(user, {
      refresh: true,
      session: session,
    });

  }

  private async generateUserResponse(
    user: User,
    options?: {
      refresh?: boolean;
      session?: Session;
      ip?: string;
      agents?: IResult; // ip and agents should be part of first args
    },
  ) {

    const cachedToken = await this.setCacheToken(
      {
        createdBy: user.id,
        ip: options.ip,
        agents: options.agents,
      },
      {
        roles: [user.role.role as Roles],
        session: options?.session,
      },
    );
    const exp = this.accessTokenOptions.expiresIn;

    return {
      accessToken: this.createAccessToken(cachedToken.payload),
      refreshToken: options?.refresh
        ? undefined
        : this.createRefreshToken(cachedToken.payload),
      user,
      expiration: Number(ms(exp)) - 100,
    };
  }

  protected async setCacheToken(
    data: {
      createdBy: string;
      ip?: string;
      agents?: IResult;
    },
    meta: { roles: Roles[]; session?: Session },
  ): Promise<{ code: string; payload: JwtToken }> {
    const session = meta.session ?? (await this.sessionService.createSession(data.ip, data.agents));

    const payload: JwtToken = {
      session: session.id,
      sub: data.createdBy, // as userId
      roles: meta.roles,
    };

    const code = MD5.hash(JSON.stringify(payload));

    return { code, payload };
  }

  protected createAccessToken(payload: JwtToken) {
    return this.jwtService.sign(payload, {
      secret: this.accessTokenOptions.secret,
      expiresIn: this.accessTokenOptions.expiresIn,
    });
  }

  protected createRefreshToken(payload: JwtToken) {
    return this.jwtService.sign(payload, {
      secret: this.refreshTokenOptions.secret,
      expiresIn: this.refreshTokenOptions.expiresIn,
    });
  }


  private async findOrCreateUser(mobile: string): Promise<User> {
    const user = await this.userService.findUserByPhone(mobile);
    return user ?? this.createUser(mobile);
  }

    private async createUser(phone: string): Promise<User> {
    try {
      return await this.userService.createUser({
        phone,
        role: Roles.User,
        firstName: '',
        lastName: ''
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
}

