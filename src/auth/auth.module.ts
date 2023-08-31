import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenJwtStrategy, GoogleStrategy } from './strategy';
import { RefreshTokenJwtStrategy } from './strategy/refresh-token-jwt.stratedy';
import { User, UserSchema } from './models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenJwtStrategy, RefreshTokenJwtStrategy, GoogleStrategy],
})
export class AuthModule {}
