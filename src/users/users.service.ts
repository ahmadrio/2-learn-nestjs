import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IPaginationResponse } from 'src/utils/services/pagination';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') readonly usersRepository: typeof User,
  ) {}

  async getWithPaging(
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
        order: [['id', 'DESC']],
        attributes: { exclude: ['password'] },
        ...otherConditional,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(createUserDto);
  }

  async findOneByEmail(
    email: string,
    exceptId?: number,
  ): Promise<{ rows: User[]; count: number }> {
    if (exceptId) {
      return await this.usersRepository.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: {
          email: email,
          id: { [Op.ne]: exceptId },
        },
      });
    } else {
      return await this.usersRepository.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: { email: email },
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(updateUserDto, {
      where: { id: id },
      individualHooks: true,
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne<User>({
      attributes: { exclude: ['password'] },
      where: { id: id },
    });
  }
}
