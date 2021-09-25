import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  nick: string;

  @Field({ defaultValue: false, nullable: true })
  @Column('bool', { default: false })
  influencer: boolean;

  @Field({ defaultValue: false })
  @Column('bool', { default: false })
  isActive: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  onTheNight?: string;

  @Field({ nullable: true })
  @Column('timestamp', { default: null, nullable: true })
  deleted_at?: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => String || null, { nullable: true })
  avatar_url(): string | null {
    return this.avatar
      ? `${process.env.SERVER_URL}/images/avatars/${this.avatar}`
      : null;
  }

  @Field(() => String || null, { nullable: true })
  onTheNight_url(): string | null {
    return this.avatar
      ? `${process.env.SERVER_URL}/images/onthenight/${this.onTheNight}`
      : null;
  }
}

export default User;
