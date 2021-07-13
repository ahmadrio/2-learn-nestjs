import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import {
  ApiResponse,
  TApiResponseDefault,
  TApiResponseWithPagination,
} from 'src/utils/generals/api-response';
import { StripRequestContextPipe } from 'src/utils/pipes/strip-request-context.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserInterceptor } from './user.interceptor';
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
      'Success get all data users',
    );
  }

  @Post()
  async store(
    @Body() createUserDto: CreateUserDto,
  ): Promise<TApiResponseDefault<User>> {
    return await ApiResponse.default(
      await this.usersService.create(createUserDto),
      'User has been created',
    );
  }

  @Put(':id')
  @UseInterceptors(UserInterceptor)
  @UsePipes(new StripRequestContextPipe())
  async update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<TApiResponseDefault<User>> {
    if (!(await this.usersService.findOneById(id))) {
      throw new NotFoundException(`User not found!`);
    }

    await this.usersService.update(id, updateUserDto);

    return await ApiResponse.default(
      await this.usersService.findOneById(id),
      'User has been updated',
    );
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TApiResponseDefault<User>> {
    if (!(await this.usersService.findOneById(id))) {
      throw new NotFoundException(`User not found!`);
    }

    return await ApiResponse.default(
      await this.usersService.findOneById(id),
      'Success get data user',
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TApiResponseDefault<[]>> {
    if (!(await this.usersService.findOneById(id))) {
      throw new NotFoundException(`User not found!`);
    }

    await this.usersService.deleteById(id);

    return await ApiResponse.default([], 'Success delete user');
  }
}
