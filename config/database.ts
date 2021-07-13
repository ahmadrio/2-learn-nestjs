import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';

dotenv.config();

export const configDatabase = {
  sqlite: {
    dialect: process.env.DB_DIALECT as Dialect,
    storage: `./database/${process.env.DB_NAME}.sqlite`,
  },
  mysql: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT as Dialect,
    database: process.env.DB_NAME,
  },
  mssql: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT as Dialect,
    database: process.env.DB_NAME,
  },
  postgres: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT as Dialect,
    database: process.env.DB_NAME,
  },
  mariadb: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT as Dialect,
    database: process.env.DB_NAME,
  },
};
