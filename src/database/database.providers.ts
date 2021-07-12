import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(__dirname + '/../../config/config.json')[env];

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
