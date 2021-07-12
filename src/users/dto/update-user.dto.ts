import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEmailUnique } from '../rules/user-email.unique';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    required: true,
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @UserEmailUnique()
  @ApiProperty({
    name: 'email',
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    name: 'password',
    required: false,
  })
  readonly password: string;
}
