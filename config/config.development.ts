import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'sqlite' as Dialect,
    storage: './database_development.sqlite',
  },
};
