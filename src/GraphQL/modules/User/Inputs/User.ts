import { IsEmailAlreadyExist } from '@GraphQL/validators/IsEmailAlreadyExist';
import { IsNickAlreadyExist } from '@GraphQL/validators/IsNickAlreadyExist';
import { Length, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 200)
  @IsNotEmpty({ message: 'The name is Required !' })
  name: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already exist !' })
  email: string;

  @Field()
  @Length(6, 250)
  @IsNotEmpty({ message: 'The password is Required !' })
  password: string;

  @Field()
  @Length(6, 250)
  @IsNotEmpty({ message: 'The passwordConfirmation is Required !' })
  passwordConfirmation: string;

  @Field()
  @Length(1, 35)
  @IsNotEmpty({ message: 'The nick is Required !' })
  @IsNickAlreadyExist({ message: 'Nick already exist !' })
  nick: string;
}

@InputType()
export class UpdateAuthUserInput {
  @Field()
  @Length(1, 200)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(1, 35)
  nick: string;

  @Field({ nullable: true })
  @ValidateIf(prop => !!prop.password || !!prop.passwordConfirmation)
  @IsNotEmpty()
  @Length(6, 250)
  lastPassword: string;

  @Field({ nullable: true })
  @ValidateIf(prop => !!prop.lastPassword)
  @IsNotEmpty()
  @Length(6, 250)
  password: string;

  @Field({ nullable: true })
  @ValidateIf(prop => !!prop.lastPassword)
  @IsNotEmpty()
  @Length(6, 250)
  passwordConfirmation: string;
}

@InputType()
export class FindOneUserInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}
