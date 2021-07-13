import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    required: true,
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
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
