import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import {
  ApiResponse,
  TApiResponseDefault,
  TApiResponseWithPagination,
} from 'src/utils/generals/api-response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiParam({ name: 'page', required: false })
  @ApiParam({ name: 'perPage', required: false })
  @ApiParam({ name: 'searchByName', required: false })
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage?: number,
    @Query('searchByName') searchByName?: string,
  ): Promise<TApiResponseWithPagination<User>> {
    return await ApiResponse.withPagination(
      await this.usersService.getWithPaging(page, perPage, searchByName),
      `success get all data users`,
    );
  }

  @Post()
  async store(
    @Body() createUserDto: CreateUserDto,
  ): Promise<TApiResponseDefault<User>> {
    return await ApiResponse.default(
      await this.usersService.create(createUserDto),
      `user has been created`,
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<TApiResponseDefault<User>> {
    await this.usersService.update(id, updateUserDto);

    return await ApiResponse.default(
      await this.usersService.findOneById(id),
      `user has been updated`,
    );
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TApiResponseDefault<User>> {
    return await ApiResponse.default(
      await this.usersService.findOneById(id),
      `success get data user`,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TApiResponseDefault<[]>> {
    await this.usersService.deleteById(id);

    return await ApiResponse.default([], `Success delete user`);
  }
}
