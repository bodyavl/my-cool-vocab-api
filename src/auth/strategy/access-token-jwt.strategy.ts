import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Admin } from '../models/admin.model';
import { Model } from 'mongoose';

@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: { sub: string; login: string }) {
    const admin = await this.adminModel.findById(payload.sub);
    delete admin.hash;
    return admin;
  }
}