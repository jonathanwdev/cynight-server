import FriendRequest from '@Typeorm/schemas/FriendRequest';
import { IsNotEmpty, IsEnum } from 'class-validator';
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

enum Status {
  accepted = 1,
  rejected = 2,
}

@InputType()
export class InteractWithFriendRequestInput {
  @Field()
  requestId: string;

  @Field(() => String)
  @IsEnum(Status)
  status: 'accepted' | 'rejected';
}
