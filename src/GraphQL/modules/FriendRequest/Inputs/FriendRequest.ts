import FriendRequest from '@Typeorm/schemas/FriendRequest';
import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Int, ObjectType } from 'type-graphql';

@InputType()
export class SendFriendRequestInput {
  @Field()
  @IsNotEmpty({ message: 'The requesterId is Required !' })
  requestedId: string;
}

@InputType()
export class FindFriendRequestInput {
  @Field(() => Int, { defaultValue: 0 })
  page: number;
}

@ObjectType()
export class FindFriendRequestResponse {
  @Field(() => [FriendRequest], { nullable: true })
  items: FriendRequest[];

  @Field()
  count: number;
}
