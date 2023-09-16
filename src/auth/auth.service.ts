import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { IUser } from './interfaces';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async googleLogin(user: IUser) {
    try {
      if (!user) {
        throw new UnauthorizedException();
      }

      const existingUser = await this.userService.findOne({
        email: user.email,
      });

      if (existingUser) {
        return existingUser;
      }

      const newUser = await this.userService.create({
        ...user,
      });

      const tokens = await this.signTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.userService.create({
        email: dto.email,
        hash,
      });

      const tokens = await this.signTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      const user = await this.userService.findOne({ email: dto.email });
      if (!user) throw new ForbiddenException('Credentials incorrect');

      const isMatch = await argon.verify(user.hash, dto.password);
      if (!isMatch) throw new ForbiddenException('Credentials incorrect');

      const tokens = await this.signTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async signTokens(userId: number, email: string) {
    const data = {
      sub: userId,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(data, {
        expiresIn: this.configService.getOrThrow('auth.expires', {
          infer: true,
        }),
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
      }),
      this.jwt.signAsync(data, {
        expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          infer: true,
        }),
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
      }),
    ]);

    return { access_token, refresh_token };
  }

  async updateTokens(id: string, refresh_token: string) {
    const user = await this.userService.findById(id);

    if (!user || !user.refresh_tokens)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = user.refresh_tokens.includes(refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const updated_refresh_tokens = user.refresh_tokens.filter(
      (token) => token !== refresh_token,
    );

    const updatedUser = await this.userService.findByIdAndUpdate(
      id,
      { refresh_tokens: updated_refresh_tokens },
      { new: true },
    );

    const tokens = await this.signTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(id: string, refresh_token: string) {
    await this.userService.findByIdAndUpdate(id, {
      $push: { refresh_tokens: refresh_token },
    });
  }
}
