import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { UserEmailUniqueRule } from '../rules/user-email.unique';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    required: true,
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(UserEmailUniqueRule)
  @ApiProperty({
    name: 'email',
    required: true,
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    required: true,
  })
  readonly password: string;
}
