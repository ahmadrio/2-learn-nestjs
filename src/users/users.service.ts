import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IPaginationResponse } from 'src/utils/services/pagination';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') readonly usersRepository: typeof User,
  ) {}

  async getAll(
    page?: number,
    perPage?: number,
    searchByName?: string,
  ): Promise<IPaginationResponse<User>> {
    const otherConditional = {};
    if (searchByName) {
      Object.assign(otherConditional, {
        where: { name: { [Op.like]: `%${searchByName}%` } },
      });
    }

    return await this.usersRepository.paginate({
      page: page,
      perPage: perPage,
      options: {
        order: [['name', 'DESC']],
        ...otherConditional,
      },
    });
  }
}
