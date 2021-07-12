import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import {
  ApiResponse,
  TApiResponseWithPagination,
} from 'src/utils/generals/api-response';
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
      await this.usersService.getAll(page, perPage, searchByName),
      'Success get data',
    );
  }
}
