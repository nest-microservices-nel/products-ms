import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  NATS_SERVERS: Array<string>;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { value, error } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error('VARIABLES DE ENTORNO INVALIDAS O INCOMPLETAS');
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  database_url: envVars.DATABASE_URL,
  natsServers: envVars.NATS_SERVERS,
};
