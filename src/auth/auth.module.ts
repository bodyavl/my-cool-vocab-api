import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenJwtStrategy, GoogleStrategy } from './strategy';
import { RefreshTokenJwtStrategy } from './strategy/refresh-token-jwt.stratedy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenJwtStrategy,
    RefreshTokenJwtStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
