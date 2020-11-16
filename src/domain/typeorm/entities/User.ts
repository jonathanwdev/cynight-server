import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nick: string;

  @Column()
  email: string;

  @Column()
  isInfluencer: boolean;

  @Column()
  password: string;

  @Column()
  avatar?: string;

  @Column()
  meInTheNight?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column('timestamp with time zone')
  deleted_at?: Date;
}
