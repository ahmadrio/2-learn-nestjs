import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';
import { IUserIdValidationArgument } from './interface/user-id-validation-arguments';

@ValidatorConstraint({ name: 'UserEmailUnique', async: true })
@Injectable()
export class UserEmailUniqueRule implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(
    email: string,
    args?: IUserIdValidationArgument,
  ): Promise<boolean> {
    const id = args?.object.context.id;

    const user = await this.usersService.findOneByEmail(email, id);
    return user.count <= 0;
  }

  defaultMessage?(): string {
    return `Email already exist`;
  }
}

export function UserEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'userEmailUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserEmailUniqueRule,
    });
  };
}
