import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WordModule } from './word/word.module';
import { UserModule } from './user/user.module';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, databaseConfig],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    WordModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
