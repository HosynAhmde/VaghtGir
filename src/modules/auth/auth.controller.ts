import { AuthGuard, RefreshGuard } from '@Common/guards';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { IResult } from 'ua-parser-js';

import { Agent, IP, RefreshToken } from './decorators';
import {
  ForgetPasswordDto,
  LoginDto,
  LoginWithPasswordDto,
  VerifyDto,
  VerifyForgetPasswordDto,
} from './dto';
import {
  ClearCookieInterceptor,
  SetRefreshTokenInterceptor,
} from './interceptors';
import { JwtToken } from './interface';
import { AuthSerializer } from './serializers';
import { AuthService } from './service/auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login/password')
  // @HttpCode(HttpStatus.OK)
  // @UseInterceptors(SetRefreshTokenInterceptor)
  // async loginWithPassword(
  //   @Body() dto: LoginWithPasswordDto,
  //   @Agent() agents: IResult,
  //   @IP() ip: string,
  // ) {
  //   return AuthSerializer.build(
  //     await this.authService.loginWithPassword(dto, { ip, agents }),
  //   );
  // }

  // @Post('forget-password')
  // @HttpCode(HttpStatus.OK)
  // forgetPassword(@Body() dto: ForgetPasswordDto) {
  //   return this.authService.forgetPassword(dto);
  // }

  // @Post('verify-password')
  // @HttpCode(HttpStatus.OK)
  // @UseInterceptors(SetRefreshTokenInterceptor)
  // async verifyForgetPassword(
  //   @Body() dto: VerifyForgetPasswordDto,
  //   @Agent() agents: IResult,
  //   @IP() ip: string,
  // ) {
  //   return AuthSerializer.build(
  //     await this.authService.verifyForgetPassword(dto, { ip, agents }),
  //   );
  // }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<{ success: boolean }> {
    const result = await this.authService.login(dto);
    return { success: result };
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(SetRefreshTokenInterceptor)
  async verify(
    @Body() verifyDto: VerifyDto,
    @Agent() agents: IResult,
    @IP() ip: string,
  ): Promise<AuthSerializer> {
    const result = await this.authService.verify(verifyDto, { ip, agents });
    return new AuthSerializer(result);
  }

  @Post('logout')
  @UseGuards(RefreshGuard)
  @UseInterceptors(ClearCookieInterceptor)
  @HttpCode(HttpStatus.OK)
  logout(@RefreshToken() refreshToken: JwtToken): Promise<boolean> {
    return this.authService.logout(refreshToken);
  }

  @Post('refresh-token')
  @UseGuards(RefreshGuard)
  @UseInterceptors(SetRefreshTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @RefreshToken() refreshToken: JwtToken,
  ): Promise<AuthSerializer> {
    const result = await this.authService.refreshToken(refreshToken);
    return new AuthSerializer(result);
  }


}
