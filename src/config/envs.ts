import 'dotenv/config';
import * as joi from 'joi';

interface EnvVar {
  PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_USERNAME: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVar = value;

export const envs = {
  PORT: envVars.PORT,
  DATABASE_USERNAME: envVars.DATABASE_USERNAME,
  DATABASE_PASSWORD: envVars.DATABASE_PASSWORD,
  DATABASE_HOST: envVars.DATABASE_HOST,
  DATABASE_NAME: envVars.DATABASE_NAME,
  DATABASE_PORT: envVars.DATABASE_PORT,
};
