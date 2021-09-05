import { Length, IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectType, InputType, Field } from 'type-graphql';

@InputType()
export class AuthenticationInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 250)
  password: string;
}

@ObjectType()
class AuthUser {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  nick: string;
}

@ObjectType()
export class AuthenticationResponse {
  @Field()
  user: AuthUser;

  @Field()
  token: string;
}
