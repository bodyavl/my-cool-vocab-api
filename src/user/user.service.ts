import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models';
import {
  AnyKeys,
  FilterQuery,
  Model,
  Document,
  Types,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(id: any): Promise<
    Document<unknown, {}, User> &
      User & {
        _id: Types.ObjectId;
      }
  > {
    return this.userModel.findById(id);
  }

  async findByIdAndUpdate(
    id: any,
    update?: UpdateQuery<User>,
    options?: QueryOptions<User>,
  ): Promise<
    Document<unknown, {}, User> &
      User & {
        _id: Types.ObjectId;
      }
  > {
    return this.userModel.findByIdAndUpdate(id, update, options);
  }

  async findOne(filter: FilterQuery<User>): Promise<
    Document<unknown, {}, User> &
      User & {
        _id: Types.ObjectId;
      }
  > {
    return this.userModel.findOne(filter);
  }

  async create(user: User | AnyKeys<User>): Promise<
    Document<unknown, {}, User> &
      User & {
        _id: Types.ObjectId;
      }
  > {
    return this.userModel.create(user);
  }
}
