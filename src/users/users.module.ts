import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserEmailUniqueRule } from './rules/user-email.unique';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UserEmailUniqueRule, ...usersProviders],
})
export class UsersModule {}
