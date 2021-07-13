import {
  UnprocessableEntityException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new UnprocessableEntityException(`email has already exists`);
    }

    return await this.usersRepository.create(createUserDto);
  }

  async findOneByEmail(email: string, exceptId?: number): Promise<User> {
    const where = { email };
    if (exceptId) {
      where['id'] = { [Op.ne]: exceptId };
    }

    return await this.usersRepository.findOne({
      attributes: { exclude: ['password'] },
      where,
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    await this.findOneById(id);

    if (await this.findOneByEmail(updateUserDto.email, id)) {
      throw new UnprocessableEntityException(`email has already exists`);
    }

    return await this.usersRepository.update(updateUserDto, {
      where: { id: id },
      individualHooks: true,
    });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne<User>({
      attributes: { exclude: ['password'] },
      where: { id },
    });

    if (user) return user;
    throw new NotFoundException(`user not found`);
  }

  async deleteById(id: number): Promise<number> {
    await this.findOneById(id);

    return await this.usersRepository.destroy({
      where: { id: id },
    });
  }
}
