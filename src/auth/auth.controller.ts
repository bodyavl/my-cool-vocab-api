import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetUser } from './decorators';
import { RefreshTokenGuard } from './guard';
import { GoogleOAuthGuard } from './guard';
import { IUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@GetUser() user: IUser) {
    return this.authService.googleLogin(user);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('admin/tokens')
  async updateTokens(
    @GetUser('id') id: string,
    @GetUser('refresh_token') refresh_token: string,
  ) {
    return this.authService.updateTokens(id, refresh_token);
  }
}
