import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { config } from '../../config/config.development';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(config.database);
      sequelize.addModels([User]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
