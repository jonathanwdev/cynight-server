import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@ObjectType()
@Entity({ name: 'friends' })
class Friends extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('uuid')
  user_id: string;

  @Column('uuid')
  friend_id: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({ name: 'friend_id' })
  friend: User;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

export default Friends;
