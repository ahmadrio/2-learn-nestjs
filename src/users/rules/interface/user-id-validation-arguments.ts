import { ValidationArguments } from 'class-validator';

export interface IUserIdValidationArgument extends ValidationArguments {
  object: {
    context: {
      id: number;
    };
  };
}
