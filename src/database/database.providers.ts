import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import config from '../../config';

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
