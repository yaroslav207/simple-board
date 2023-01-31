import {config} from 'dotenv';
import {AppEnvironment} from '@/common/enums/app/app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  DB_HOST,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: PORT,
  },
  JWT: {
    SECRET: SECRET_KEY,
  },
  API: {
    V1_PREFIX: '/api/v1/',
  },
  DB: {
    NAME: DB_NAME,
    PORT: DB_PORT,
    HOST: DB_HOST,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
  },
};

export {ENV};
