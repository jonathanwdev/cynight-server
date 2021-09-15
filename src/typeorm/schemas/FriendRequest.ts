import { Field, ID, ObjectType } from 'type-graphql';
import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';

@ObjectType()
@Entity('friend_requests')
class FriendRequest {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column('uuid')
  user_requester: string;

  @Field()
  @Column('uuid')
  user_requested: string;

  @Field()
  @Column({ nullable: false })
  text: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: 'awaiting',
  })
  @Column({ type: 'string', default: 'awaiting' })
  status: 'awaiting' | 'accepted' | 'rejected';

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  beforeInsertAction(): void {
    this.status = 'awaiting';
  }
}

export default FriendRequest;
