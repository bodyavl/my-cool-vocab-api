import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { DatabaseConfig } from './config.types';
import validateConfig from '../utils/validate-config';

class EnvironmentalVariablesValidator {
  @IsString()
  DATABASE_URL: string;
}

export default registerAs<DatabaseConfig>('database', (): DatabaseConfig => {
  validateConfig(process.env, EnvironmentalVariablesValidator);

  return {
    url: process.env.DATABASE_URL,
  };
});
