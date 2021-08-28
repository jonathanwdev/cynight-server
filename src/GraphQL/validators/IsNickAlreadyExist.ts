import User from '@Typeorm/entity/User';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsNickAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(nick: string): Promise<boolean> {
    return User.findOne({ where: { nick } }).then(user => {
      if (user) return false;
      return true;
    });
  }
}

export function IsNickAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNickAlreadyExistConstraint,
    });
  };
}
